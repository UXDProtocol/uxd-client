import {
  I80F48,
  MangoAccount,
  nativeI80F48ToUi,
  nativeToUi,
  Payer,
  PerpMarket,
  PerpMarketConfig,
  uiToNative,
} from '@blockworks-foundation/mango-client';
import { BorshAccountsCoder } from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey } from '@solana/web3.js';
import { Mango } from '.';
import { findAddrSync, UXD_DECIMALS } from '../utils';
import { IDL } from '../idl';
import { MangoDepositoryAccount } from '../interfaces';

export enum OrderBookSide {
  Bid,
  Ask,
}

// Outcome of a swap operation
export interface SwapEstimate {
  // Estimated final outcome
  yield: number;
  fees: number;
  slippage: number;
}

export class MangoDepository {
  public pda: PublicKey;
  public mangoAccountPda: PublicKey;
  public collateralMint: PublicKey;
  public collateralMintSymbol: string;
  public collateralMintDecimals: number;
  public quoteMint: PublicKey;
  public quoteMintSymbol: string;
  public quoteMintDecimals: number;
  // Internals
  mangoAccount?: MangoAccount;

  public constructor(
    mint: PublicKey,
    mintName: string,
    mintDecimals: number,
    quoteMint: PublicKey,
    quoteMintName: string,
    quoteMintDecimals: number,
    uxdProgramId: PublicKey
  ) {
    this.collateralMint = mint;
    this.collateralMintSymbol = mintName;
    this.collateralMintDecimals = mintDecimals;
    this.quoteMint = quoteMint;
    this.quoteMintSymbol = quoteMintName;
    this.quoteMintDecimals = quoteMintDecimals;
    [this.pda] = findAddrSync(
      [Buffer.from('MANGODEPOSITORY'), mint.toBuffer()],
      uxdProgramId
    );
    [this.mangoAccountPda] = findAddrSync(
      [Buffer.from('MANGOACCOUNT'), mint.toBuffer()],
      uxdProgramId
    );
  }

  public info() {
    console.groupCollapsed(
      '[Depository debug info - Collateral mint:',
      this.collateralMintSymbol,
      ' - decimals',
      this.collateralMintDecimals,
      ']'
    );
    console.table({
      ['pda']: this.pda.toString(),
      ['collateralMint']: this.collateralMint.toString(),
      ['collateralMintSymbol']: this.collateralMintSymbol.toString(),
      ['collateralMintDecimals']: this.collateralMintDecimals.toString(),
      ['quoteMint']: this.quoteMint.toString(),
      ['quoteMintSymbol']: this.quoteMintSymbol.toString(),
      ['quoteMintDecimals']: this.quoteMintDecimals.toString(),
      ['MangoAccountPda']: this.mangoAccountPda.toString(),
    });
    console.groupEnd();
  }

  // MARK: - Helpers ----------------------------------------------------------

  // Load or reload
  async getMangoAccount(mango: Mango): Promise<MangoAccount> {
    if (!this.mangoAccount) {
      this.mangoAccount = await mango.load(this.mangoAccountPda);
      return this.mangoAccount;
    } else {
      return await mango.reload(this.mangoAccount);
    }
  }

  getPerpMarketConfig(mango: Mango): PerpMarketConfig {
    return mango.getPerpMarketConfig(this.collateralMintSymbol);
  }

  getPerpMarket(mango: Mango): Promise<PerpMarket> {
    const pmc = this.getPerpMarketConfig(mango); // perpMarketConfig
    return mango.client.getPerpMarket(
      pmc.publicKey,
      pmc.baseDecimals,
      pmc.quoteDecimals
    );
  }

  // MARK: - Public -----------------------------------------------------------

  public async getOnchainAccount(
    connection: Connection,
    options: ConfirmOptions
  ): Promise<MangoDepositoryAccount> {
    const coder = new BorshAccountsCoder(IDL);
    const result = await connection.getAccountInfo(
      this.pda,
      options.commitment
    );
    if (!result) {
      throw new Error('mangoDepositoryAccount not found');
    }
    return coder.decode('mangoDepository', result.data);
  }

  public async getCollateralOraclePrice(mango: Mango): Promise<I80F48> {
    const mangoCache = await mango.getCache();
    const tokenIndex = mango.group.getTokenIndex(this.collateralMint);
    const price = mango.group.getPriceNative(tokenIndex, mangoCache);
    return price;
  }

  public async getCollateralOraclePriceUI(mango: Mango): Promise<number> {
    const mangoCache = await mango.getCache();
    const tokenIndex = mango.group.getTokenIndex(this.collateralMint);
    const price = mango.group.getPriceUi(tokenIndex, mangoCache);
    return price;
  }

  public async getCollateralPerpPriceUI(mango: Mango): Promise<number> {
    const mangoCache = await mango.getCache();
    const pmc = this.getPerpMarketConfig(mango); // perpMarketConfig
    const pmi = pmc.marketIndex; // perpMarketIndex
    const price = mango.group.getPrice(pmi, mangoCache);
    return price.toNumber();
  }

  // Native
  public async getCollateralBalance(mango: Mango): Promise<I80F48> {
    const ma = await this.getMangoAccount(mango);
    return mango.mangoAccountSpotBalanceFor(
      this.collateralMint,
      this.collateralMintSymbol,
      ma
    );
  }

  public async getQuoteBalanceUI(mango: Mango): Promise<number> {
    return nativeI80F48ToUi(
      await this.getQuoteBalance(mango),
      this.quoteMintDecimals
    ).toNumber();
  }

  public async getQuoteBalance(mango: Mango): Promise<I80F48> {
    const mangoAccount = await mango.load(this.mangoAccountPda);
    return mango.mangoAccountSpotBalanceQuote(mangoAccount);
  }

  public async getInsuranceBalanceUI(mango: Mango): Promise<number> {
    return nativeI80F48ToUi(
      await this.getInsuranceBalance(mango),
      this.quoteMintDecimals
    ).toNumber();
  }

  public async getInsuranceBalance(mango: Mango): Promise<I80F48> {
    return this.getQuoteBalance(mango);
    // const ma = await this.getMangoAccount(mango);
    // return mango.mangoAccountSpotBalanceFor(
    //   this.quoteMint,
    //   this.quoteMintSymbol,
    //   ma
    // );
  }

  // Return the taker_fee for the collateral perp
  public getCollateralPerpTakerFees(mango: Mango): number {
    const perpMarketConfig = this.getPerpMarketConfig(mango);
    const perpMarketIndex = perpMarketConfig.marketIndex;
    return mango.group.perpMarkets[perpMarketIndex].takerFee.toNumber();
  }

  public getCollateralPerpQuoteLotSize(mango: Mango): number {
    const perpMarketConfig = this.getPerpMarketConfig(mango);
    const perpMarketIndex = perpMarketConfig.marketIndex;
    return mango.group.perpMarkets[perpMarketIndex].quoteLotSize.toNumber();
  }

  public getCollateralPerpBaseLotSize(mango: Mango): number {
    const perpMarketConfig = this.getPerpMarketConfig(mango);
    const perpMarketIndex = perpMarketConfig.marketIndex;
    return mango.group.perpMarkets[perpMarketIndex].baseLotSize.toNumber();
  }

  public async getMinTradingSizeCollateralUI(mango: Mango): Promise<number> {
    const perpBaseLotSize = this.getCollateralPerpBaseLotSize(mango);
    return nativeToUi(perpBaseLotSize, this.collateralMintDecimals);
  }

  public async getMinTradingSizeQuoteUI(mango: Mango): Promise<number> {
    const collateralPerpPriceUI = await this.getCollateralPerpPriceUI(mango);
    return (
      (await this.getMinTradingSizeCollateralUI(mango)) * collateralPerpPriceUI
    );
  }

  public async getMinMintSizeQuoteUI(mango: Mango): Promise<number> {
    return this.getMinTradingSizeQuoteUI(mango);
  }

  // Fees are factored in
  public async getMinRedeemSizeQuoteUI(mango: Mango): Promise<number> {
    return (await this.getMinTradingSizeQuoteUI(mango)) * 1.1;
  }

  public async getDeltaNeutralPositionNotionalSizeUI(
    mango: Mango
  ): Promise<number> {
    const ma = await this.getMangoAccount(mango); // mangoAccount
    const pmc = this.getPerpMarketConfig(mango); // perpMarketConfig
    const pm = await this.getPerpMarket(mango); // perpMarket
    const pa = ma.perpAccounts[pmc.marketIndex]; // perpAccount
    // Need to use the base and taker base as it might not be settled yet
    const basePosition = pm?.baseLotsToNumber(
      pa.basePosition.add(pa.takerBase)
    );
    const indexPrice = await this.getCollateralPerpPriceUI(mango);
    return Math.abs(basePosition * indexPrice);
  }

  // heavy
  public async getUnrealizedPnl(
    mango: Mango,
    options: ConfirmOptions
  ): Promise<number> {
    // Do the lengthy operation first to have the most up to date price
    const depositoryOnchainAccount = await this.getOnchainAccount(
      mango.client.connection,
      options
    );
    const redeemableAmountUnderManagementUi = nativeToUi(
      depositoryOnchainAccount.redeemableAmountUnderManagement.toNumber(),
      UXD_DECIMALS
    ); // Here should inject controller to be nice

    const deltaNeutralPositionNotionalSize =
      await this.getDeltaNeutralPositionNotionalSizeUI(mango);
    const unrealizedPnl =
      redeemableAmountUnderManagementUi - deltaNeutralPositionNotionalSize;
    return unrealizedPnl;
  }

  public async getFundingRate(mango: Mango): Promise<number> {
    const pmc = this.getPerpMarketConfig(mango); // perpMarketConfig
    const pm = await this.getPerpMarket(mango); // perpMarket
    const mc = await mango.getCache();
    const pmi = pmc.marketIndex;
    const bids = await pm.loadBids(mango.client.connection);
    const asks = await pm.loadAsks(mango.client.connection);

    return pm.getCurrentFundingRate(mango.group, mc, pmi, bids, asks);
  }

  // This call allow to "settle" the paper profits of the depository. Anyone can call it, result is that it settle a particular account
  // with any other accounts it finds, to settle (redeem) paper-profits or losses
  public async settleMangoDepositoryMangoAccountPnl(
    payer: Payer,
    mango: Mango
  ): Promise<string | null> {
    const ma = await mango.load(this.mangoAccountPda); // mangoAccount
    const pmc = this.getPerpMarketConfig(mango); // perpMarketConfig
    const mc = await mango.group.loadCache(mango.client.connection); // mangoCache
    const pm = await mango.client.getPerpMarket(
      pmc.publicKey,
      pmc.baseDecimals,
      pmc.quoteDecimals
    ); // perpMarket
    const quoteRootBank = await mango.getQuoteRootBank();
    const price = mc.priceCache[pmc.marketIndex].price;

    return mango.client.settlePnl(
      mango.group,
      mc,
      ma,
      pm,
      quoteRootBank,
      price,
      payer
    );
  }

  // Estimated amount of Redeemable (UXD) that will be given for Minting (Mint or RebalancingLite when PnlPolarity is positive)
  // `collateralQuantity` : In Collateral UI units
  //  Output -> breakdown of estimated costs
  public async getMintingEstimates(
    collateralQuantity: number,
    perpPrice: number,
    mintingPriceImpact: number,
    mango: Mango
  ): Promise<SwapEstimate> {
    const takerFee = this.getCollateralPerpTakerFees(mango);
    const perfectAmount = collateralQuantity * perpPrice;
    const realAmount = collateralQuantity * mintingPriceImpact;
    const fees = realAmount * takerFee;
    const slippage = perfectAmount - realAmount - fees;
    const finalYield = realAmount - fees;
    return { yield: finalYield, fees, slippage };
  }

  // Estimated amount of Collateral (SOL/BTC/ETH) that will be given for Redeeming (Redeem or RebalancingLite when PnlPolarity is negative)
  // `collateralQuantity` : In UXD UI units
  //  Output -> Collateral UI Units, estimated
  public async getRedeemingEstimates(
    redeemableQuantity: number,
    perpPrice: number,
    priceImpact: number,
    mango: Mango
  ): Promise<SwapEstimate> {
    const takerFee = this.getCollateralPerpTakerFees(mango);
    const collateralQuantity = redeemableQuantity / perpPrice;
    const perfectAmount = collateralQuantity * perpPrice;
    const realAmount = collateralQuantity * priceImpact;
    const fees = realAmount * takerFee;
    const slippage = perfectAmount - realAmount - fees;
    const finalYield = realAmount - fees;
    return { yield: finalYield, fees, slippage };
  }

  // Price impact for a minting operation (Mint or RebalancingLite when PnlPolarity is positive)
  public async getMintingPriceImpact(
    collateralQuantity: number, // UI units
    mango: Mango
  ): Promise<number | undefined> {
    // Minting is placing a ask IoC limit order, will check the impact on the bid side
    return this.getMangoPerpOrderBookPriceImpact(
      mango,
      collateralQuantity,
      OrderBookSide.Ask
    );
  }

  // Price impact for a redeeming operation (Redeeming or RebalancingLite when PnlPolarity is negative)
  public async getRedeemingPriceImpact(
    redeemableQuantity: number, // UI units
    perpPrice: number,
    mango: Mango
  ): Promise<number | undefined> {
    const takerFee = this.getCollateralPerpTakerFees(mango);
    // Remove the max possible fees, as we place an order on that amount to  make sure we can pay for the fees on the program side.
    const redeemableQuantityMinusFees = redeemableQuantity * (1 - takerFee);
    const collateralQuantity = redeemableQuantityMinusFees / perpPrice;
    // Redeeming is placing a bid IoC limit order, will check the impact on the ask side
    return this.getMangoPerpOrderBookPriceImpact(
      mango,
      collateralQuantity,
      OrderBookSide.Bid
    );
  }

  // Return the price impact for an order
  public async getMangoPerpOrderBookPriceImpact(
    mango: Mango,
    quantity: number, // UI AMount
    side: OrderBookSide
  ): Promise<number> {
    const nativeQuantity = uiToNative(quantity, this.collateralMintDecimals);

    const { loadBids, loadAsks } = await this.getPerpMarket(mango);
    const loadSideBook = side === OrderBookSide.Bid ? loadBids : loadAsks;
    const sideBook = await loadSideBook(mango.client.connection, false);
    const priceImpact = sideBook.getImpactPriceUi(nativeQuantity);
    if (!priceImpact) {
      throw new Error("PriceImpact couldn't be determined.");
    }
    return priceImpact;
  }
}
