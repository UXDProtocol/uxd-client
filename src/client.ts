import { uiToNative } from '@blockworks-foundation/mango-client';
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
    const supplyCapAmountNativeUnits = uiToNative(
      supplyCapAmount,
      controller.redeemableMintDecimals
    );
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
    const supplySoftCapAmountNativeUnits = uiToNative(
      supplySoftCapAmount,
      controller.redeemableMintDecimals
    );
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
    const perpSide = polarity === PnLPolarity.Positive ? 'short' : 'long'; //'sell' : 'buy';

    const [userCollateralATA, userQuoteATA, limitPriceI80F48] =
      await Promise.all([
        utils.token.associatedAddress({
          mint: depository.collateralMint,
          owner: user,
        }),
        utils.token.associatedAddress({
          mint: depository.quoteMint,
          owner: user,
        }),
        depository.getLimitPrice(I80F48.fromNumber(slippage), perpSide, mango),
      ]);

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
    const maxRebalancingAmountNative = uiToNative(
      maxRebalancingAmount,
      depository.quoteMintDecimals
    );

    return this.instruction.rebalanceMangoDepositoryLite(
      maxRebalancingAmountNative,
      polarity == PnLPolarity.Positive ? { positive: {} } : { negative: {} },
      limitPriceI80F48.toNumber(),
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
    const insuranceAmountBN = uiToNative(
      insuranceDepositedAmount,
      depository.quoteMintDecimals
    );
    return this.instruction.depositInsuranceToMangoDepository(
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
    const insuranceAmountBN = uiToNative(
      insuranceWithdrawnAmount,
      depository.quoteMintDecimals
    );
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
    const [userCollateralATA, userRedeemableATA, limitPriceI80F48] =
      await Promise.all([
        utils.token.associatedAddress({
          mint: depository.collateralMint,
          owner: user,
        }),
        utils.token.associatedAddress({
          mint: controller.redeemableMintPda,
          owner: user,
        }),
        depository.getLimitPrice(I80F48.fromNumber(slippage), 'short', mango),
      ]);

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

    const collateralAmountBN = uiToNative(
      collateralAmount,
      depository.collateralMintDecimals
    );

    return this.instruction.mintWithMangoDepository(
      collateralAmountBN,
      limitPriceI80F48.toNumber(),
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
    const [userCollateralATA, userRedeemableATA, limitPriceI80F48] =
      await Promise.all([
        utils.token.associatedAddress({
          mint: depository.collateralMint,
          owner: user,
        }),
        utils.token.associatedAddress({
          mint: controller.redeemableMintPda,
          owner: user,
        }),
        depository.getLimitPrice(I80F48.fromNumber(slippage), 'long', mango),
      ]);

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
    const redeemAmountBN = uiToNative(
      amountRedeemable,
      controller.redeemableMintDecimals
    );

    return this.instruction.redeemFromMangoDepository(
      redeemAmountBN,
      limitPriceI80F48.toNumber(),
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

  public async createQuoteMintWithMangoDepositoryInstruction(
    quoteAmount: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): Promise<TransactionInstruction> {
    const depositedTokenIndex = mango.group.getTokenIndex(depository.quoteMint);
    const mangoCacheAccount = mango.getMangoCacheAccount();
    const mangoRootBankAccount = mango.getRootBankForToken(depositedTokenIndex);
    const mangoNodeBankAccount = mango.getNodeBankFor(
      depositedTokenIndex,
      depository.quoteMint
    );
    const mangoDepositedVaultAccount = mango.getVaultFor(depositedTokenIndex);
    const mangoPerpMarketConfig = mango.getPerpMarketConfig(
      depository.collateralMintSymbol
    );
    const userQuoteATA = findATAAddrSync(user, depository.quoteMint)[0];
    const userRedeemableATA = findATAAddrSync(
      user,
      controller.redeemableMintPda
    )[0];
    const quoteAmountNativeBN = new BN(
      quoteAmount * 10 ** depository.collateralMintDecimals
    );
    return this.instruction.quoteMintWithMangoDepository(quoteAmountNativeBN, {
      accounts: {
        user: user,
        payer: payer ?? user,
        controller: controller.pda,
        depository: depository.pda,
        redeemableMint: controller.redeemableMintPda,
        userQuote: userQuoteATA,
        userRedeemable: userRedeemableATA,
        mangoAccount: depository.mangoAccountPda,
        // mango accounts for CPI
        mangoGroup: mango.group.publicKey,
        mangoCache: mangoCacheAccount,
        mangoRootBank: mangoRootBankAccount,
        mangoNodeBank: mangoNodeBankAccount,
        mangoVault: mangoDepositedVaultAccount,
        mangoPerpMarket: mangoPerpMarketConfig.publicKey,
        //
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        mangoProgram: mango.programId,
        //
        rent: SYSVAR_RENT_PUBKEY,
      },
      options: options,
    });
  }

  public async createQuoteRedeemWithMangoDepositoryInstruction(
    redeemableAmount: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): Promise<TransactionInstruction> {
    const depositedTokenIndex = mango.group.getTokenIndex(depository.quoteMint);
    const mangoCacheAccount = mango.getMangoCacheAccount();
    const mangoGroupSigner = mango.group.signerKey;
    const mangoRootBankAccount = mango.getRootBankForToken(depositedTokenIndex);
    const mangoNodeBankAccount = mango.getNodeBankFor(
      depositedTokenIndex,
      depository.quoteMint
    );
    const mangoDepositedVaultAccount = mango.getVaultFor(depositedTokenIndex);
    const mangoPerpMarketConfig = mango.getPerpMarketConfig(
      depository.collateralMintSymbol
    );
    const userQuoteATA = findATAAddrSync(user, depository.quoteMint)[0];
    const userRedeemableATA = findATAAddrSync(
      user,
      controller.redeemableMintPda
    )[0];
    const redeemableAmountNativeBN = new BN(
      redeemableAmount * 10 ** controller.redeemableMintDecimals
    );
    return this.instruction.quoteRedeemFromMangoDepository(
      redeemableAmountNativeBN,
      {
        accounts: {
          user: user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          redeemableMint: controller.redeemableMintPda,
          quoteMint: depository.quoteMint,
          userQuote: userQuoteATA,
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
          mangoPerpMarket: mangoPerpMarketConfig.publicKey,
          //
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          mangoProgram: mango.programId,
          //
          rent: SYSVAR_RENT_PUBKEY,
        },
        options: options,
      }
    );
  }

  public createSetMangoDepositoryQuoteMintAndRedeemFeeInstruction(
    quoteFee: number,
    controller: Controller,
    depository: MangoDepository,
    authority: PublicKey,
    options: ConfirmOptions
  ): TransactionInstruction {
    return this.instruction.setMangoDepositoryQuoteMintAndRedeemFee(quoteFee, {
      accounts: {
        authority: authority,
        controller: controller.pda,
        depository: depository.pda,
      },
      options: options,
    });
  }

  public createDisableDepositoryMintingInstruction(
    disableMinting: boolean,
    controller: Controller,
    depository: MangoDepository,
    authority: PublicKey,
    options: ConfirmOptions
  ): TransactionInstruction {
    return this.instruction.disableDepositoryMinting(disableMinting, {
      accounts: {
        authority: authority,
        controller: controller.pda,
        depository: depository.pda,
      },
      options: options,
    });
  }
}
