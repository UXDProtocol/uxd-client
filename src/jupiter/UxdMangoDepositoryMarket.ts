import { BN, BookSide, MangoAccount, MangoCache, MangoGroup, PerpMarket, } from '@blockworks-foundation/mango-client';
import { PublicKey, AccountInfo } from '@solana/web3.js';
import { ControllerAccount, MangoDepositoryAccount } from '../';
import { UxdMangoAccountDecoder } from "./decoder";
import type { AccountInfoMap, Amm, Quote, QuoteParams, UxdMangoDepositoryMarketParams } from "./types";
import getRegularMintQuote from "./getRegularMintQuote";

export class UxdMangoDepositoryMarket implements Amm {
    public readonly depositoryPda: PublicKey;
    public readonly reserveTokenMints: PublicKey[];

    public readonly decoder: UxdMangoAccountDecoder;

    // Settings
    protected readonly uxdProgramId: PublicKey;
    protected readonly controllerPda: PublicKey;
    protected readonly depositoryMangoAccountPda: PublicKey;
    protected readonly mangoCachePda: PublicKey;
    protected readonly mangoGroupPda: PublicKey;
    protected readonly mangoPerpMarketPda: PublicKey;
    protected readonly mangoPerpMarketAsksPda: PublicKey;
    protected readonly mangoPerpMarketBidsPda: PublicKey;

    protected readonly mangoPerpMarketIndex: number;

    // Onchain accounts info
    protected accountsInfo: {
        depository: MangoDepositoryAccount,
        controller: ControllerAccount,
        mangoAccount: MangoAccount,
        mangoGroup: MangoGroup,
        mangoCache: MangoCache,
        perpMarket: PerpMarket,
        asks: BookSide,
        bids: BookSide,
    } | null = null;

    // Each class handles one pool, for if the AMM has both USDC-USDT and SOL-USDC pools, it will have
    // handle just one pool at the time. Let's say we are calculating for the USDC-USDT pool, this
    // will only do it for the USDC-USDT pool.
    //
    // Address is the MangoDepository pubkey
    constructor(address: PublicKey, accountInfo: AccountInfo<Buffer>, {
        uxdProgramId,
        mangoCachePda,
        mangoGroupPda,
        mangoPerpMarketPda,
        mangoPerpMarketAsksPda,
        mangoPerpMarketBidsPda,
        mangoPerpMarketIndex,
    }: UxdMangoDepositoryMarketParams) {
        this.uxdProgramId = uxdProgramId;

        this.decoder = new UxdMangoAccountDecoder();

        this.controllerPda = this.deriveControllerPda();

        const redeemableMint = this.deriveRedeemableMint();

        const {
            mangoAccount: depositoryMangoAccountPda,
            collateralMint,
            quoteMint,
        } = this.decoder.decodeMangoDepositoryAccount(accountInfo);

        this.depositoryMangoAccountPda = depositoryMangoAccountPda;

        this.reserveTokenMints = [collateralMint, quoteMint, redeemableMint];

        this.depositoryPda = address;
        this.mangoCachePda = mangoCachePda;
        this.mangoGroupPda = mangoGroupPda;
        this.mangoPerpMarketPda = mangoPerpMarketPda;
        this.mangoPerpMarketAsksPda = mangoPerpMarketAsksPda;
        this.mangoPerpMarketBidsPda = mangoPerpMarketBidsPda;
        this.mangoPerpMarketIndex = mangoPerpMarketIndex;
    }

    // Here, we will query for a list of PublicKey's in one call with `getMultipleAccountInfos`.
    public getAccountsForUpdate(): PublicKey[] {
        return [
            this.depositoryPda,
            this.controllerPda,
            this.depositoryMangoAccountPda,
            this.mangoGroupPda,
            this.mangoCachePda,
            this.mangoPerpMarketPda,
            this.mangoPerpMarketAsksPda,
            this.mangoPerpMarketBidsPda,
        ];
    }

    // Throw if account info cannot be find
    protected extractAccountInfoFromAccountInfoMap(accountInfoMap: AccountInfoMap, address: PublicKey): AccountInfo<Buffer> {
        const accountInfo = accountInfoMap.get(address.toBase58());

        if (!accountInfo) {
            throw new Error("one of the required accounts is missing");
        }

        return accountInfo;
    }

    // Once we have the accountInfo's from the above call, we pass them into this method.
    public update(accountInfoMap: AccountInfoMap): void {
        // Delete the accountsInfo to avoid deprecated value in case of decoding failure
        this.accountsInfo = null;

        // Extract the appropriate Accounts info
        const [
            mangoDepositoryAccountInfo,
            controllerAccountInfo,
            depositoryMangoAccountAccountInfo,
            mangoGroupAccountInfo,
            mangoPerpMarketAccountInfo,
            mangoPerpMarketAsksAccountInfo,
            mangoPerpMarketBidsAccountInfo,
            mangoCacheAccountInfo,
        ] = [
            this.depositoryPda,
            this.controllerPda,
            this.depositoryMangoAccountPda,
            this.mangoGroupPda,
            this.mangoPerpMarketPda,
            this.mangoPerpMarketAsksPda,
            this.mangoPerpMarketBidsPda,
            this.mangoCachePda,
        ].map(address => this.extractAccountInfoFromAccountInfoMap(accountInfoMap, address));

        // Decode the accounts info
        const depository = this.decoder.decodeMangoDepositoryAccount(mangoDepositoryAccountInfo);
        const controller = this.decoder.decodeControllerAccount(controllerAccountInfo);
        const mangoAccount = this.decoder.decodeMangoAccount(this.depositoryMangoAccountPda, depositoryMangoAccountAccountInfo);
        const mangoGroup = this.decoder.decodeMangoGroup(this.mangoGroupPda, mangoGroupAccountInfo);

        const baseTokenIndex = mangoGroup.getTokenIndex(depository.collateralMint);
        const quoteTokenIndex = mangoGroup.getTokenIndex(depository.quoteMint);

        const perpMarket = this.decoder.decodeMangoPerpMarket(this.mangoPerpMarketPda, mangoGroup.getTokenDecimals(baseTokenIndex), mangoGroup.getTokenDecimals(quoteTokenIndex), mangoPerpMarketAccountInfo);

        const asks = this.decoder.decodeMangoBookSide(this.mangoPerpMarketAsksPda, perpMarket, mangoPerpMarketAsksAccountInfo, false);
        const bids = this.decoder.decodeMangoBookSide(this.mangoPerpMarketBidsPda, perpMarket, mangoPerpMarketBidsAccountInfo, false);

        const mangoCache = this.decoder.decodeMangoCache(this.mangoCachePda, mangoCacheAccountInfo);

        // Store the accounts info
        this.accountsInfo = {
            depository,
            controller,
            mangoAccount,
            mangoGroup,
            perpMarket,
            asks,
            bids,
            mangoCache,
        };
    }

    // Now we have the necessary data to calculate the Quote.
    public getQuote({ sourceMint, destinationMint, amount }: QuoteParams): Quote {
        if (!this.accountsInfo) {
            throw new Error('Missing accounts info');
        }

        const {
            depository,
            controller,
            mangoGroup,
            mangoCache,
            bids,
        } = this.accountsInfo;

        const {
            collateralMint,
            quoteMint,
        } = depository;

        const {
            redeemableMint,
        } = controller;

        // Regular mint
        if (sourceMint.equals(collateralMint) && destinationMint.equals(redeemableMint)) {
            return getRegularMintQuote({
                collateralAmount: new BN(amount.toString()),
                bids,
                mangoGroup,
                mangoCache,
                mangoPerpMarketIndex: this.mangoPerpMarketIndex,
                mangoPerpMarketPda: this.mangoPerpMarketPda,
                feeMint: depository.quoteMint,
            });
        }

        // Regular Redeem
        if (sourceMint.equals(redeemableMint) && destinationMint.equals(collateralMint)) {
            throw new Error('Not implemented yet');
        }

        //  Rebalancing-lite Positive Pnl
        if (sourceMint.equals(collateralMint) && destinationMint.equals(quoteMint)) {
            throw new Error('Not implemented yet');
        }

        //  Rebalancing-lite Negative Pnl
        if (sourceMint.equals(quoteMint) && destinationMint.equals(collateralMint)) {
            throw new Error('Not implemented yet');
        }

        //  Quote Mint
        if (sourceMint.equals(quoteMint) && destinationMint.equals(redeemableMint)) {
            throw new Error('Not implemented yet');
        }

        //  Quote Redeem
        if (sourceMint.equals(redeemableMint) && destinationMint.equals(quoteMint)) {
            throw new Error('Not implemented yet');
        }

        throw new Error('Unknown sourceMint/destinationMint pair');
    }

    protected deriveRedeemableMint(): PublicKey {
        return PublicKey.findProgramAddressSync(
            [Buffer.from('REDEEMABLE')],
            this.uxdProgramId,
        )[0];
    }

    protected deriveControllerPda(): PublicKey {
        return PublicKey.findProgramAddressSync(
            [Buffer.from('CONTROLLER')],
            this.uxdProgramId,
        )[0];
    }
}

// // Estimated amount of Collateral (SOL/BTC/ETH) that will be given for Redeeming (Redeem or RebalancingLite when PnlPolarity is negative)
// // `collateralQuantity` : In UXD UI units
// //  Output -> Collateral UI Units, estimated
// function getRegularRedeemQuote(
//     redeemableQuantity: number,
//     perpPrice: number,
//     priceImpact: number,
//     mango: Mango
// ): Quote {
//     const takerFee = this.getCollateralPerpTakerFees(mango);
//     const collateralQuantity = redeemableQuantity / perpPrice;
//     const perfectAmount = collateralQuantity * perpPrice;
//     const realAmount = collateralQuantity * priceImpact;
//     const fees = realAmount * takerFee;
//     const slippage = perfectAmount - realAmount - fees;
//     const finalYield = realAmount - fees;
//     return { yield: finalYield, fees, slippage };
// }