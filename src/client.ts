import { BN, InstructionNamespace, utils } from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  ConfirmOptions,
  TransactionInstruction,
  PublicKey,
} from '@solana/web3.js';
import { Controller } from './controller';
import { MangoDepository } from './mango/depository';
import { Mango } from './mango';
import { findATAAddrSync } from './utils';
import { ZoDepository } from './01/depository';
import { Zo } from './01';
import { ZO_FUTURE_TAKER_FEE } from '@zero_one/client';
import NamespaceFactory from './namespace';
import { IDL as UXD_IDL } from './idl';
import { PnLPolarity } from './interfaces';
import { I80F48 } from './index';

export class UXDClient {
  public instruction: InstructionNamespace<typeof UXD_IDL>;

  public constructor(programId: PublicKey) {
    this.instruction = NamespaceFactory.buildInstructionNamespace(
      UXD_IDL,
      programId
    );
  }

  public createInitializeControllerInstruction(
    controller: Controller,
    authority: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const redeemableMintDecimals = new BN(controller.redeemableMintDecimals);
    return this.instruction.initializeController(redeemableMintDecimals, {
      accounts: {
        authority,
        payer: payer ?? authority,
        controller: controller.pda,
        redeemableMint: controller.redeemableMintPda,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      options: options,
    });
  }

  public createSetRedeemableGlobalSupplyCapInstruction(
    controller: Controller,
    authority: PublicKey,
    supplyCapAmount: number,
    options: ConfirmOptions
  ): TransactionInstruction {
    const supplyCapAmountNativeUnits = new BN(supplyCapAmount) * new BN(10) ** new BN(controller.redeemableMintDecimals);
    return this.instruction.setRedeemableGlobalSupplyCap(
      supplyCapAmountNativeUnits,
      {
        accounts: {
          authority,
          controller: controller.pda,
        },
        options: options,
      }
    );
  }

  public createSetMangoDepositoriesRedeemableSoftCapInstruction(
    controller: Controller,
    authority: PublicKey,
    supplySoftCapAmount: number,
    options: ConfirmOptions
  ): TransactionInstruction {
    const supplySoftCapAmountNativeUnits = new BN(supplySoftCapAmount) * new BN(10) ** new BN(controller.redeemableMintDecimals);
    return this.instruction.setMangoDepositoriesRedeemableSoftCap(
      supplySoftCapAmountNativeUnits,
      {
        accounts: {
          authority: authority,
          controller: controller.pda,
        },
        options: options,
      }
    );
  }

  public createRegisterMangoDepositoryInstruction(
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    authority: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    return this.instruction.registerMangoDepository({
      accounts: {
        authority,
        payer: payer ?? authority,
        controller: controller.pda,
        depository: depository.pda,
        collateralMint: depository.collateralMint,
        quoteMint: depository.quoteMint,
        mangoAccount: depository.mangoAccountPda,
        mangoGroup: mango.group.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        mangoProgram: mango.programId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options: options,
    });
  }

  public async createRebalanceMangoDepositoryLiteInstruction(
    maxRebalancingAmount: number,
    slippage: number,
    polarity: PnLPolarity,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): Promise<TransactionInstruction> {
    const userCollateralATA = await utils.token.associatedAddress({
      mint: depository.collateralMint,
      owner: user,
    });
    const userQuoteATA = await utils.token.associatedAddress({
      mint: depository.quoteMint,
      owner: user,
    });
    const mangoGroupSigner = mango.group.signerKey;
    const mangoCacheAccount = mango.getMangoCacheAccount();
    const quoteMintTokenIndex = mango.group.getTokenIndex(depository.quoteMint);
    const mangoRootBankAccountQuote =
      mango.getRootBankForToken(quoteMintTokenIndex);
    const mangoNodeBankAccountQuote = mango.getNodeBankFor(
      quoteMintTokenIndex,
      depository.quoteMint
    );
    const mangoVaultAccountQuote = mango.getVaultFor(quoteMintTokenIndex);
    const collateralMintTokenIndex = mango.group.getTokenIndex(
      depository.collateralMint
    );
    const mangoRootBankAccountCollateral = mango.getRootBankForToken(
      collateralMintTokenIndex
    );
    const mangoNodeBankAccountCollateral = mango.getNodeBankFor(
      collateralMintTokenIndex,
      depository.collateralMint
    );
    const mangoVaultAccountCollateral = mango.getVaultFor(
      collateralMintTokenIndex
    );
    const mangoPerpMarketConfig = mango.getPerpMarketConfig(
      depository.collateralMintSymbol
    );
    const maxRebalancingAmountNative = new BN(maxRebalancingAmount) * new BN(10) ** new BN(depository.quoteMintDecimals);
    const perpSide = polarity == PnLPolarity.Positive ? 'short' : 'long'; //'sell' : 'buy';
    const limit_price = (
      await depository.getLimitPrice(
        I80F48.fromNumber(slippage),
        perpSide,
        mango
      )
    ).toNumber();
    return this.instruction.rebalanceMangoDepositoryLite(
      maxRebalancingAmountNative,
      polarity == PnLPolarity.Positive ? { positive: {} } : { negative: {} },
      limit_price,
      {
        accounts: {
          user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          collateralMint: depository.collateralMint,
          quoteMint: depository.quoteMint,
          userCollateral: userCollateralATA,
          userQuote: userQuoteATA,
          mangoAccount: depository.mangoAccountPda,
          mangoSigner: mangoGroupSigner,
          mangoGroup: mango.group.publicKey,
          mangoCache: mangoCacheAccount,
          mangoRootBankQuote: mangoRootBankAccountQuote,
          mangoNodeBankQuote: mangoNodeBankAccountQuote,
          mangoVaultQuote: mangoVaultAccountQuote,
          mangoRootBankCollateral: mangoRootBankAccountCollateral,
          mangoNodeBankCollateral: mangoNodeBankAccountCollateral,
          mangoVaultCollateral: mangoVaultAccountCollateral,
          mangoPerpMarket: mangoPerpMarketConfig.publicKey,
          mangoBids: mangoPerpMarketConfig.bidsKey,
          mangoAsks: mangoPerpMarketConfig.asksKey,
          mangoEventQueue: mangoPerpMarketConfig.eventsKey,
          // programs
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          mangoProgram: mango.programId,
        },
        options: options,
      }
    );
  }

  public async createDepositInsuranceToMangoDepositoryInstruction(
    insuranceDepositedAmount: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    authority: PublicKey,
    options: ConfirmOptions
  ): Promise<TransactionInstruction> {
    const depositedTokenIndex = mango.group.getTokenIndex(depository.quoteMint);
    const mangoCacheAccount = mango.getMangoCacheAccount();
    const mangoRootBankAccount = mango.getRootBankForToken(depositedTokenIndex);
    const mangoNodeBankAccount = mango.getNodeBankFor(
      depositedTokenIndex,
      depository.quoteMint
    );
    const mangoDepositedVaultAccount = mango.getVaultFor(depositedTokenIndex);
    const authorityQuoteATA = await utils.token.associatedAddress({
      mint: depository.quoteMint,
      owner: authority,
    });
    const insuranceAmountBN = new BN(insuranceDepositedAmount) * new BN(10) ** new BN(depository.quoteMintDecimals);
    return this.instruction.depositInsuranceToMangoDepository(
      insuranceAmountBN,
      {
        accounts: {
          authority: authority,
          controller: controller.pda,
          depository: depository.pda,
          collateralMint: depository.collateralMint,
          quoteMint: depository.quoteMint,
          authorityQuote: authorityQuoteATA,
          mangoAccount: depository.mangoAccountPda,
          // mango accounts for CPI
          mangoGroup: mango.group.publicKey,
          mangoCache: mangoCacheAccount,
          mangoRootBank: mangoRootBankAccount,
          mangoNodeBank: mangoNodeBankAccount,
          mangoVault: mangoDepositedVaultAccount,
          //
          tokenProgram: TOKEN_PROGRAM_ID,
          mangoProgram: mango.programId,
        },
        options: options,
      }
    );
  }

  public createWithdrawInsuranceFromMangoDepositoryInstruction(
    insuranceWithdrawnAmount: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    authority: PublicKey,
    options: ConfirmOptions
  ): TransactionInstruction {
    const withdrawnTokenIndex = mango.group.getTokenIndex(depository.quoteMint);
    const mangoCacheAccount = mango.getMangoCacheAccount();
    const mangoGroupSigner = mango.group.signerKey;
    const mangoRootBankAccount = mango.getRootBankForToken(withdrawnTokenIndex);
    const mangoNodeBankAccount = mango.getNodeBankFor(
      withdrawnTokenIndex,
      depository.quoteMint
    );
    const mangoDepositedVaultAccount = mango.getVaultFor(withdrawnTokenIndex);
    const authorityQuoteATA = findATAAddrSync(
      authority,
      depository.quoteMint
    )[0];
    const insuranceAmountBN = new BN(insuranceWithdrawnAmount) * new BN(10) ** new BN(depository.quoteMintDecimals);
    return this.instruction.withdrawInsuranceFromMangoDepository(
      insuranceAmountBN,
      {
        accounts: {
          authority: authority,
          controller: controller.pda,
          depository: depository.pda,
          authorityQuote: authorityQuoteATA,
          mangoAccount: depository.mangoAccountPda,
          // mango accounts for CPI
          mangoGroup: mango.group.publicKey,
          mangoCache: mangoCacheAccount,
          mangoSigner: mangoGroupSigner,
          mangoRootBank: mangoRootBankAccount,
          mangoNodeBank: mangoNodeBankAccount,
          mangoVault: mangoDepositedVaultAccount,
          //
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          mangoProgram: mango.programId,
        },
        options: options,
      }
    );
  }

  public async createMintWithMangoDepositoryInstruction(
    collateralAmount: number,
    slippage: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): Promise<TransactionInstruction> {
    const depositedTokenIndex = mango.group.getTokenIndex(
      depository.collateralMint
    );
    const mangoCacheAccount = mango.getMangoCacheAccount();
    const mangoRootBankAccount = mango.getRootBankForToken(depositedTokenIndex);
    const mangoNodeBankAccount = mango.getNodeBankFor(
      depositedTokenIndex,
      depository.collateralMint
    );
    const mangoDepositedVaultAccount = mango.getVaultFor(depositedTokenIndex);
    const mangoPerpMarketConfig = mango.getPerpMarketConfig(
      depository.collateralMintSymbol
    );
    const userCollateralATA = await utils.token.associatedAddress({
      mint: depository.collateralMint,
      owner: user,
    });
    const userRedeemableATA = await utils.token.associatedAddress({
      mint: controller.redeemableMintPda,
      owner: user,
    });
    const collateralAmountBN = new BN(collateralAmount) * new BN(10) ** new BN(depository.collateralMintDecimals);
    const limit_price = (
      await depository.getLimitPrice(
        I80F48.fromNumber(slippage),
        'short',
        mango
      )
    ).toNumber();
    console.log('LIMIT_PRICE for PERP ORDER : ', limit_price);
    return this.instruction.mintWithMangoDepository(
      collateralAmountBN,
      limit_price,
      {
        accounts: {
          user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          redeemableMint: controller.redeemableMintPda,
          userCollateral: userCollateralATA,
          userRedeemable: userRedeemableATA,
          // mango accounts for CPI
          mangoAccount: depository.mangoAccountPda,
          mangoGroup: mango.group.publicKey,
          mangoCache: mangoCacheAccount,
          mangoRootBank: mangoRootBankAccount,
          mangoNodeBank: mangoNodeBankAccount,
          mangoVault: mangoDepositedVaultAccount,
          mangoPerpMarket: mangoPerpMarketConfig.publicKey,
          mangoBids: mangoPerpMarketConfig.bidsKey,
          mangoAsks: mangoPerpMarketConfig.asksKey,
          mangoEventQueue: mangoPerpMarketConfig.eventsKey,
          //
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          mangoProgram: mango.programId,
        },
        options: options,
      }
    );
  }

  public async createRedeemFromMangoDepositoryInstruction(
    amountRedeemable: number,
    slippage: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): Promise<TransactionInstruction> {
    const depositedTokenIndex = mango.group.getTokenIndex(
      depository.collateralMint
    );
    const mangoCacheAccount = mango.getMangoCacheAccount();
    const mangoGroupSigner = mango.group.signerKey;
    const mangoRootBankAccount = mango.getRootBankForToken(depositedTokenIndex);
    const mangoNodeBankAccount = mango.getNodeBankFor(
      depositedTokenIndex,
      depository.collateralMint
    );
    const mangoDepositedVaultAccount = mango.getVaultFor(depositedTokenIndex);
    const mangoPerpMarketConfig = mango.getPerpMarketConfig(
      depository.collateralMintSymbol
    );
    const userCollateralATA = await utils.token.associatedAddress({
      mint: depository.collateralMint,
      owner: user,
    });
    const userRedeemableATA = await utils.token.associatedAddress({
      mint: controller.redeemableMintPda,
      owner: user,
    });
    const redeemAmountBN = new BN(amountRedeemable) * new BN(10) ** new BN(controller.redeemableMintDecimals);
    const limit_price = (
      await depository.getLimitPrice(I80F48.fromNumber(slippage), 'long', mango)
    ).toNumber();
    return this.instruction.redeemFromMangoDepository(
      redeemAmountBN,
      limit_price,
      {
        accounts: {
          user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          collateralMint: depository.collateralMint,
          redeemableMint: controller.redeemableMintPda,
          userCollateral: userCollateralATA,
          userRedeemable: userRedeemableATA,
          mangoAccount: depository.mangoAccountPda,
          // mango stuff
          mangoGroup: mango.group.publicKey,
          mangoCache: mangoCacheAccount,
          mangoSigner: mangoGroupSigner,
          // -- for the withdraw
          mangoRootBank: mangoRootBankAccount,
          mangoNodeBank: mangoNodeBankAccount,
          mangoVault: mangoDepositedVaultAccount,
          // -- for the perp position closing
          mangoPerpMarket: mangoPerpMarketConfig.publicKey,
          mangoBids: mangoPerpMarketConfig.bidsKey,
          mangoAsks: mangoPerpMarketConfig.asksKey,
          mangoEventQueue: mangoPerpMarketConfig.eventsKey,
          //
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          mangoProgram: mango.programId,
        },
        options: options,
      }
    );
  }

  public async createRegisterZoDepositoryInstruction(
    controller: Controller,
    depository: ZoDepository,
    authority: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): Promise<TransactionInstruction> {
    return this.instruction.registerZoDepository({
      accounts: {
        authority,
        payer: payer ?? authority,
        controller: controller.pda,
        depository: depository.pda,
        collateralMint: depository.collateralMint,
        quoteMint: depository.quoteMint,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options: options,
    });
  }

  public async createInitializeZoDepositoryInstruction(
    controller: Controller,
    depository: ZoDepository,
    zo: Zo,
    control: PublicKey,
    authority: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): Promise<TransactionInstruction> {
    const market = await zo.state.getMarketBySymbol(
      depository.collateralMintSymbol + '-PERP'
    );
    const openOrdersPda =
      await depository.getZoAccountCollateralOpenOrdersAccountKey(zo, control);

    return this.instruction.initializeZoDepository({
      accounts: {
        authority,
        payer: payer ?? authority,
        controller: controller.pda,
        depository: depository.pda,
        zoAccount: depository.zoAccountPda,
        zoOpenOrders: openOrdersPda,
        zoState: zo.state.pubkey,
        zoStateSigner: zo.state.signer,
        zoDexMarket: market.address,
        zoControl: control,
        zoDexProgram: zo.dexProgramId,
        systemProgram: SystemProgram.programId,
        zoProgram: zo.program.programId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options: options,
    });
  }

  public async createMintWithZoDepositoryInstruction(
    collateralAmount: number, // UI
    slippage: number,
    controller: Controller,
    depository: ZoDepository,
    zo: Zo,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): Promise<TransactionInstruction> {
    const marginAccount = await zo.loadMarginAccount(depository.pda);
    const userCollateralATA = await utils.token.associatedAddress({
      mint: depository.collateralMint,
      owner: user,
    });
    const userRedeemableATA = await utils.token.associatedAddress({
      mint: controller.redeemableMintPda,
      owner: user,
    });
    const limitPrice = depository.getLimitPrice(slippage, 'short', zo);
    const market = await zo.state.getMarketBySymbol(
      depository.collateralMintSymbol + '-PERP'
    );

    const limitPriceBn = market.priceNumberToLots(limitPrice);
    const feeMultiplier = 1 - ZO_FUTURE_TAKER_FEE;
    const maxBaseQtyBn = market.baseSizeNumberToLots(collateralAmount);
    // Removing the odd lots
    const maxQuoteQtyNativeBn = new BN(
      Math.round(
        limitPriceBn
          .mul(maxBaseQtyBn)
          .mul(market.decoded['quoteLotSize'])
          .toNumber() * feeMultiplier
      )
    );
    console.log('QUOTE LOT SIZE', market.decoded['quoteLotSize'].toNumber());
    console.log('BASE LOT SIZE', market.decoded['baseLotSize'].toNumber());

    console.log('collateralAmount', collateralAmount);
    console.log('Limit price', limitPriceBn.toNumber());
    console.log('maxQuoteQtyBn', maxQuoteQtyNativeBn.toNumber());
    console.log('maxBaseQtyBn', maxBaseQtyBn.toNumber());
    return this.instruction.mintWithZoDepository(
      maxBaseQtyBn,
      maxQuoteQtyNativeBn,
      limitPriceBn,
      {
        accounts: {
          user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          redeemableMint: controller.redeemableMintPda,
          userCollateral: userCollateralATA,
          userRedeemable: userRedeemableATA,
          zoAccount: depository.zoAccountPda,
          zoState: zo.state.pubkey,
          zoStateSigner: zo.state.signer,
          zoCache: zo.state.cache.pubkey,
          zoVault: zo.state.getVaultCollateralByMint(
            depository.collateralMint
          )[0],
          zoControl: marginAccount.control.pubkey,
          zoOpenOrders:
            await depository.getZoAccountCollateralOpenOrdersAccountKey(
              zo,
              marginAccount.control.pubkey
            ),
          zoDexMarket: market.address,
          zoReqQ: market.requestQueueAddress,
          zoEventQ: market.eventQueueAddress,
          zoMarketBids: market.bidsAddress,
          zoMarketAsks: market.asksAddress,
          zoDexProgram: zo.dexProgramId,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          zoProgram: zo.program.programId,
          rent: SYSVAR_RENT_PUBKEY,
        },
        options: options,
      }
    );
  }

  public async createRedeemFromZoDepositoryInstruction(
    redeemableAmount: number,
    slippage: number,
    controller: Controller,
    depository: ZoDepository,
    zo: Zo,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): Promise<TransactionInstruction> {
    const marginAccount = await zo.loadMarginAccount(depository.pda);
    const userCollateralATA = await utils.token.associatedAddress({
      mint: depository.collateralMint,
      owner: user,
    });
    const userRedeemableATA = await utils.token.associatedAddress({
      mint: controller.redeemableMintPda,
      owner: user,
    });
    const perpPrice = depository.getPerpPriceUI(zo);
    const limitPrice = depository.getLimitPrice(slippage, 'long', zo);
    const market = await zo.state.getMarketBySymbol(
      depository.collateralMintSymbol + '-PERP'
    );

    console.log('redeemableAmount', redeemableAmount);
    const perpPriceBn = market.priceNumberToLots(perpPrice);
    const limitPriceBn = market.priceNumberToLots(limitPrice);
    const feeMultiplier = 1 - ZO_FUTURE_TAKER_FEE;
    // We reduce the max quote by the max fees amount so that they can be collected on top of the redeemed amount of token
    // (See program redeem instruction comment for more infos)
    const maxQuoteQtyLotPurchaseBn = market.quoteSizeNumberToLots(
      redeemableAmount * feeMultiplier
    );
    const maxBaseQtyBn = new BN(
      Math.round(maxQuoteQtyLotPurchaseBn.div(perpPriceBn).toNumber())
    );
    console.log('Limit price', limitPriceBn.toNumber());
    console.log(
      'maxQuoteQtyLotPurchaseBn',
      maxQuoteQtyLotPurchaseBn.toNumber()
    );
    console.log('maxBaseQtyBn', maxBaseQtyBn.toNumber());
    return this.instruction.redeemFromZoDepository(
      maxBaseQtyBn,
      maxQuoteQtyLotPurchaseBn,
      limitPriceBn,
      {
        accounts: {
          user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          redeemableMint: controller.redeemableMintPda,
          userCollateral: userCollateralATA,
          userRedeemable: userRedeemableATA,
          zoAccount: depository.zoAccountPda,
          zoState: zo.state.pubkey,
          zoStateSigner: zo.state.signer,
          zoCache: zo.state.cache.pubkey,
          zoVault: zo.state.getVaultCollateralByMint(
            depository.collateralMint
          )[0],
          zoControl: marginAccount.control.pubkey,
          zoOpenOrders:
            await depository.getZoAccountCollateralOpenOrdersAccountKey(
              zo,
              marginAccount.control.pubkey
            ),
          zoDexMarket: market.address,
          zoReqQ: market.requestQueueAddress,
          zoEventQ: market.eventQueueAddress,
          zoMarketBids: market.bidsAddress,
          zoMarketAsks: market.asksAddress,
          zoDexProgram: zo.dexProgramId,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          zoProgram: zo.program.programId,
          rent: SYSVAR_RENT_PUBKEY,
        },
        options: options,
      }
    );
  }

  public async createDepositInsuranceToZoDepositoryInstruction(
    insuranceDepositedAmount: number,
    controller: Controller,
    depository: ZoDepository,
    zo: Zo,
    authority: PublicKey,
    options: ConfirmOptions
  ): Promise<TransactionInstruction> {
    const authorityQuoteATA = await utils.token.associatedAddress({
      mint: depository.quoteMint,
      owner: authority,
    });
    const insuranceAmountBN = new BN(insuranceDepositedAmount) * new BN(10) ** new BN(depository.quoteMintDecimals);
    return this.instruction.depositInsuranceToZoDepository(insuranceAmountBN, {
      accounts: {
        authority: authority,
        controller: controller.pda,
        depository: depository.pda,
        authorityQuote: authorityQuoteATA,
        // Zo accounts for CPI
        zoAccount: depository.zoAccountPda,
        zoState: zo.state.pubkey,
        zoStateSigner: zo.state.signer,
        zoCache: zo.state.cache.pubkey,
        zoVault: zo.state.getVaultCollateralByMint(depository.quoteMint)[0],
        //
        tokenProgram: TOKEN_PROGRAM_ID,
        zoProgram: zo.program.programId,
      },
      options: options,
    });
  }

  public async createWithdrawInsuranceFromZoDepositoryInstruction(
    insuranceWithdrawnAmount: number,
    controller: Controller,
    depository: ZoDepository,
    zo: Zo,
    authority: PublicKey,
    options: ConfirmOptions
  ): Promise<TransactionInstruction> {
    const marginAccount = await zo.loadMarginAccount(depository.pda);
    const authorityQuoteATA = await utils.token.associatedAddress({
      mint: depository.quoteMint,
      owner: authority,
    });
    const insuranceAmountBN = new BN(insuranceWithdrawnAmount) * new BN(10) ** new BN(depository.quoteMintDecimals);
    return this.instruction.withdrawInsuranceFromZoDepository(
      insuranceAmountBN,
      {
        accounts: {
          authority: authority,
          controller: controller.pda,
          depository: depository.pda,
          authorityQuote: authorityQuoteATA,
          // Zo accounts for CPI
          zoAccount: depository.zoAccountPda,
          zoControl: marginAccount.control.pubkey,
          zoState: zo.state.pubkey,
          zoStateSigner: zo.state.signer,
          zoCache: zo.state.cache.pubkey,
          zoVault: zo.state.getVaultCollateralByMint(depository.quoteMint)[0],
          //
          tokenProgram: TOKEN_PROGRAM_ID,
          zoProgram: zo.program.programId,
        },
        options: options,
      }
    );
  }
}
