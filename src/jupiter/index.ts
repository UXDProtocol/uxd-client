import { BN, BookSide, Cluster, Config, getPerpMarketByBaseSymbol, getPerpMarketByIndex, getTokenByMint, getTokenBySymbol, GroupConfig, I80F48, IDS, MangoAccount, MangoAccountLayout, MangoCache, MangoCacheLayout, MangoGroup, MangoGroupLayout, PerpMarket, PerpMarketConfig, PerpMarketLayout, uiToNative } from '@blockworks-foundation/mango-client';
import { BorshAccountsCoder } from '@project-serum/anchor';
import { PublicKey, AccountInfo } from '@solana/web3.js';
import JSBI from "jsbi";
import { Controller, ControllerAccount, Mango, MangoDepositoryAccount } from '../';
import { IDL } from '../';
import { MangoDepository } from '../';

export type AccountInfoMap = Map<string, AccountInfo<Buffer> | null>;
export type TokenMintAddress = string;
export enum SwapMode {
    ExactIn = "ExactIn",
    ExactOut = "ExactOut",
}

interface Amm {
    reserveTokenMints: PublicKey[];
    getAccountsForUpdate(): PublicKey[];
    update(accountInfoMap: AccountInfoMap): void;
    getQuote(quoteParams: QuoteParams): Quote;
}

interface QuoteParams {
    sourceMint: PublicKey;
    destinationMint: PublicKey;
    amount: JSBI;
    swapMode: SwapMode;
}

interface Quote {
    notEnoughLiquidity: boolean;
    inAmount: JSBI;
    outAmount: JSBI;
    feeAmount: JSBI;
    feeMint: TokenMintAddress;
    feePct: number;
    priceImpactPct: number;
}

interface SwapParams {
    sourceMint: PublicKey;
    destinationMint: PublicKey;
    userSourceTokenAccount: PublicKey;
    userDestinationTokenAccount: PublicKey;
    userTransferAuthority: PublicKey;
    inAmount: JSBI;
}

////

const coder = new BorshAccountsCoder(IDL);

// Will justprioritize in the getQuote function
// export enum UxdMangoDepositorySwapMode {
//     Regular = "Regular", // will use the Collateral-Redeemable route
//     Rebalancing = "Rebalancing", // will use the Collateral-Quote route
//     QuoteMintRedeem = "QuoteMintRedeem" // will use the Redeemable-Quote route
// }

interface UxdMangoDepositoryMarketParams {
    uxdProgramId: PublicKey;
    collateralMint: PublicKey;
    mangoGroupPda: PublicKey;
    mangoCachePda: PublicKey;
    mangoPerpMarketPda: PublicKey;
    mangoPerpMarketAsksPda: PublicKey;
    mangoPerpMarketBidsPda: PublicKey;
    mangoPerpMarketIndex: number;
}

///// Here is the code to use to get the different PDA to fill the Params for the init

// // Get Mango groupConfigPDA
// MANGO_PROGRAM_ID_MAINNET
// let mangoConfig = new Config(IDS);
// let mangoCluster = 'mainnet';
// let mangoGroupName = MANGO_MAINNET_GROUP_ONE;
// const groupConfig = mangoConfig.getGroup(mangoCluster, mangoGroupName);
// if (!groupConfig) {
//     throw new Error('unable to get mango group config');
// }
// const clusterData = IDS.groups.find(
//     (g: { name: string; cluster: string }) => {
//         return g.name === params.mangoGroupName && g.cluster === params.mangoCluster;
//     }
// );
// if (!clusterData) {
//     throw new Error('cluster data not found');

// }
// this.mangoGroupPda = groupConfig.publicKey;

// let quoteToken = getTokenBySymbol(groupConfig, groupConfig.quoteSymbol);
// if (!quoteToken) {
//     throw new Error('quoteToken not found');
// }
// let collateralToken = getTokenByMint(groupConfig, params.collateralMint);
// if (!collateralToken) {
//     throw new Error('collateralToken not found');
// }

// // Get perpMarketPDA

// let perpMarketConfig = getPerpMarketByBaseSymbol(groupConfig, collateralToken.symbol);
// if (!perpMarketConfig) {
//     throw new Error('perpMarket not found');
// }

export class UxdMangoDepositoryMarket implements Amm {
    address: PublicKey; // DepositoryPda
    id: string;
    reserveTokenMints: PublicKey[];
    private uxdProgramId: PublicKey;
    private controllerPda: PublicKey;
    private depositoryMangoAccountPda: PublicKey;
    private mangoCachePda: PublicKey;
    private mangoGroupPda: PublicKey;
    private mangoPerpMarketPda: PublicKey;
    private mangoPerpMarketAsksPda: PublicKey;
    private mangoPerpMarketBidsPda: PublicKey;

    private perpMarketIndex: number;

    private depository?: MangoDepositoryAccount;
    private controller?: ControllerAccount;
    private mangoAccount?: MangoAccount;
    private mangoGroup?: MangoGroup;
    private mangoCache?: MangoCache;
    private perpMarket?: PerpMarket;
    private asks?: BookSide;
    private bids?: BookSide;

    // Each class handles one pool, for if the AMM has both USDC-USDT and SOL-USDC pools, it will have
    // handle just one pool at the time. Let's say we are calculating for the USDC-USDT pool, this
    // will only do it for the USDC-USDT pool.
    //
    // Address is the MangoDepository pubkey
    constructor(address: PublicKey, accountInfo: AccountInfo<Buffer>, params: UxdMangoDepositoryMarketParams) {
        this.address = address;
        this.id = this.address.toBase58();
        this.uxdProgramId = params.uxdProgramId;
        this.controllerPda = this.deriveControllerPda();
        let mangoDepositoryAccount = this.decodeMangoDepositoryAccount(accountInfo);
        let redeemableMint = this.deriveRedeemableMint();
        this.reserveTokenMints = [mangoDepositoryAccount.collateralMint, mangoDepositoryAccount.quoteMint, redeemableMint];
        this.depositoryMangoAccountPda = mangoDepositoryAccount.mangoAccount;
        this.mangoCachePda = params.mangoCachePda;
        this.mangoGroupPda = params.mangoGroupPda;
        this.mangoPerpMarketPda = params.mangoPerpMarketPda;
        this.mangoPerpMarketAsksPda = params.mangoPerpMarketAsksPda;
        this.mangoPerpMarketBidsPda = params.mangoPerpMarketBidsPda;
        this.perpMarketIndex = params.mangoPerpMarketIndex;
    }

    // Here, we will query for a list of PublicKey's in one call with `getMultipleAccountInfos`.
    getAccountsForUpdate(): PublicKey[] {
        return [
            this.address,
            this.controllerPda,
            this.depositoryMangoAccountPda,
            this.mangoGroupPda,
            this.mangoCachePda,
            this.mangoPerpMarketPda,
            this.mangoPerpMarketAsksPda,
            this.mangoPerpMarketBidsPda
        ];
    }

    // Once we have the accountInfo's from the above call, we pass them into this method.
    update(accountInfoMap: AccountInfoMap): void {
        const mangoDepositoryAccountInfo = accountInfoMap.get(this.id);
        const controllerAccountInfo = accountInfoMap.get(this.controllerPda.toBase58());
        const depositoryMangoAccountAccountInfo = accountInfoMap.get(this.depositoryMangoAccountPda.toBase58());
        const mangoGroupAccountInfo = accountInfoMap.get(this.mangoGroupPda.toBase58());
        const mangoPerpMarketAccountInfo = accountInfoMap.get(this.mangoPerpMarketPda.toBase58());
        const mangoPerpMarketAsksAccountInfo = accountInfoMap.get(this.mangoPerpMarketAsksPda.toBase58());
        const mangoPerpMarketBidsAccountInfo = accountInfoMap.get(this.mangoPerpMarketBidsPda.toBase58());
        const mangoCacheAccountInfo = accountInfoMap.get(this.mangoCachePda.toBase58());

        if (!mangoDepositoryAccountInfo || !controllerAccountInfo || !depositoryMangoAccountAccountInfo || !mangoGroupAccountInfo || !mangoPerpMarketAccountInfo || !mangoPerpMarketAsksAccountInfo || !mangoPerpMarketBidsAccountInfo || !mangoCacheAccountInfo) {
            throw new Error("one of the required accounts is missing");
        }
        this.depository = this.decodeMangoDepositoryAccount(mangoDepositoryAccountInfo);
        this.controller = this.decodeControllerAccount(controllerAccountInfo);
        this.mangoAccount = this.decodeMangoAccount(this.depositoryMangoAccountPda, depositoryMangoAccountAccountInfo);
        this.mangoGroup = this.decodeMangoGroup(this.mangoGroupPda, mangoGroupAccountInfo);

        let baseTokenIndex = this.mangoGroup.getTokenIndex(this.depository.collateralMint);
        let quoteTokenIndex = this.mangoGroup.getTokenIndex(this.depository.quoteMint);
        this.perpMarket = this.decodeMangoPerpMarket(this.mangoPerpMarketPda, this.mangoGroup.getTokenDecimals(baseTokenIndex), this.mangoGroup.getTokenDecimals(quoteTokenIndex), mangoPerpMarketAccountInfo);
        this.asks = this.decodeMangoBookSide(this.mangoPerpMarketAsksPda, this.perpMarket, mangoPerpMarketAsksAccountInfo, false);
        this.bids = this.decodeMangoBookSide(this.mangoPerpMarketBidsPda, this.perpMarket, mangoPerpMarketBidsAccountInfo, false);
        this.mangoCache = this.decodeMangoCache(this.mangoCachePda, mangoCacheAccountInfo);
    }

    // Now we have the necessary data to calculate the Quote.
    getQuote({ sourceMint, destinationMint, amount }: QuoteParams): Quote {
        if (!this.depository || !this.controller || !this.mangoAccount || !this.mangoGroup || !this.perpMarket || !this.asks || !this.bids || !this.mangoCache) {
            throw new Error("update not ran yet"); // Maybe don't error here
        }
        let collateralMint = this.depository.collateralMint;
        let quoteMint = this.depository.quoteMint;
        let redeemableMint = this.controller.redeemableMint;
        switch ([sourceMint, destinationMint]) {
            // Regular Mint
            case [collateralMint, redeemableMint]: {
                return getRegularMintQuote(amount, this.bids, this.mangoGroup, this.mangoCache, this.perpMarketIndex, this.mangoPerpMarketPda, this.depository.quoteMint);
            }
            // Regular Redeem
            case [redeemableMint, collateralMint]: {
                return getRegularRedeemQuote(amount)
            }
            // Rebalancing-lite Positive Pnl
            case [collateralMint, quoteMint]: {
                return getRebalancingLitePositivePnlQuote(amount);
            }
            // Rebalancing-lite Negative Pnl
            case [quoteMint, collateralMint]: {
                return getRebalancingLiteNegativePnlQuote(amount);
            }
            // Quote Mint
            case [quoteMint, redeemableMint]: {
                return getQuoteMintQuote(amount);
            }
            // Quote Redeem
            case [redeemableMint, quoteMint]: {
                return getQuoteRedeemQuote(amount);
            }

        };
    }

    // ---

    decodeMangoDepositoryAccount(accountInfo: AccountInfo<Buffer>): MangoDepositoryAccount {
        return coder.decode('mangoDepository', accountInfo.data);
    }

    decodeControllerAccount(accountInfo: AccountInfo<Buffer>): ControllerAccount {
        return coder.decode('controller', accountInfo.data);
    }

    decodeMangoAccount(address: PublicKey, accountInfo: AccountInfo<Buffer>): MangoAccount {
        return new MangoAccount(
            address,
            MangoAccountLayout.decode(accountInfo.data),
        );
    }

    decodeMangoGroup(address: PublicKey, accountInfo: AccountInfo<Buffer>): MangoGroup {
        return new MangoGroup(
            address,
            MangoGroupLayout.decode(accountInfo.data),
        );
    }

    decodeMangoPerpMarket(address: PublicKey, baseDecimals: number, quoteDecimals: number, accountInfo: AccountInfo<Buffer>): PerpMarket {
        return new PerpMarket(
            address,
            baseDecimals,
            quoteDecimals,
            PerpMarketLayout.decode(accountInfo.data),
        );
    }

    decodePerpMarketAccount(
        address: PublicKey,
        baseDecimal: number,
        quoteDecimal: number,
        accountInfo: AccountInfo<Buffer>
    ): PerpMarket {
        return new PerpMarket(
            address,
            baseDecimal,
            quoteDecimal,
            PerpMarketLayout.decode(accountInfo.data),
        );
    }

    decodeMangoBookSide(
        address: PublicKey,
        perpMarket: PerpMarket,
        accountInfo: AccountInfo<Buffer>,
        includeExpired?: boolean,
        maxBookDelay?: number
    ): BookSide {
        return new BookSide(
            address,
            perpMarket,
            PerpMarketLayout.decode(accountInfo.data),
            includeExpired,
            maxBookDelay
        );
    }

    decodeMangoCache(address: PublicKey, accountInfo: AccountInfo<Buffer>): MangoCache {
        return new MangoCache(address, MangoCacheLayout.decode(accountInfo.data));
    }

    deriveRedeemableMint(): PublicKey {
        return PublicKey.findProgramAddressSync(
            [Buffer.from('REDEEMABLE')],
            this.uxdProgramId
        )[0];
    }

    deriveControllerPda(): PublicKey {
        return PublicKey.findProgramAddressSync(
            [Buffer.from('CONTROLLER')],
            this.uxdProgramId
        )[0];
    }
}

// Return the price impact of a base amount order for a given bookside
function perpOrderPriceImpact(
    baseNativeAmount: JSBI,
    bookSide: BookSide,
): JSBI {
    const priceImpact = bookSide.getImpactPriceUi(new BN(baseNativeAmount));
    if (typeof priceImpact === 'undefined') {
        throw new Error("Price impact couldn't be determined.");
    }
    return JSBI.BigInt(priceImpact);
}

// let feeAmount = perpOrderFees(100, mangoGroup, this.mangoPerpMarketConfig.marketIndex);
function perpOrderFees(
    amount: JSBI,
    mangoGroup: MangoGroup,
    marketIndex: number
): JSBI {
    let takerFeeRate = JSBI.BigInt(mangoGroup.perpMarkets[marketIndex].takerFee.toString());
    return JSBI.multiply(amount, JSBI.divide(takerFeeRate, JSBI.BigInt(1)));
}

function perpPrice(mangoGroup: MangoGroup, mangoCache: MangoCache, perpMarketPda: PublicKey): JSBI {
    let perpMarketIndex = mangoGroup.getPerpMarketIndex(perpMarketPda);
    return JSBI.BigInt(mangoGroup.getPrice(perpMarketIndex, mangoCache).toBig());
}

// Estimated amount of Redeemable (UXD) that will be given for Minting (Mint or RebalancingLite when PnlPolarity is positive)
// `collateralQuantity` : In Collateral UI units
//  Output -> breakdown of estimated costs
function getRegularMintQuote(
    inAmount: JSBI, // Collateral
    bids: BookSide,
    mangoGroup: MangoGroup,
    mangoCache: MangoCache,
    marketIndex: number,
    perpMarketPda: PublicKey,
    feeMint: PublicKey,
): Quote {
    // Current mid price (without any order quantity consideration)
    const midPrice = perpPrice(mangoGroup, mangoCache, perpMarketPda);
    // Order execution reached price, how much this order will move the price
    let executionPrice;
    try {
        executionPrice = perpOrderPriceImpact(inAmount, bids);
    } catch {
        return {
            notEnoughLiquidity: true,
            inAmount: inAmount,
            outAmount: JSBI.BigInt(0),
            feeAmount: JSBI.BigInt(0),
            feeMint: feeMint.toBase58(),
            feePct: 0,
            priceImpactPct: 0,
        }
    };
    const midToExecutionPriceDelta = JSBI.subtract(executionPrice, midPrice);
    const priceImpactPct = JSBI.divide(midToExecutionPriceDelta, midPrice);

    // We calculate a worse case out amount, that isn't super precise, because the execution price is just the highest reached, not the average
    const executionSizeEstimate = JSBI.multiply(inAmount, executionPrice);
    const feeAmount = perpOrderFees(executionSizeEstimate, mangoGroup, marketIndex);
    const feePct = JSBI.divide(feeAmount, inAmount);
    const outAmountEstimate = JSBI.subtract(executionSizeEstimate, feeAmount);

    return {
        notEnoughLiquidity: false,
        inAmount: inAmount,
        outAmount: outAmountEstimate,
        feeAmount: feeAmount,
        feeMint: feeMint.toBase58(),
        feePct: JSBI.toNumber(feePct),
        priceImpactPct: JSBI.toNumber(priceImpactPct),
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