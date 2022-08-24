import { uiToNative, I80F48 } from '@blockworks-foundation/mango-client';
import { BN, InstructionNamespace } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  ConfirmOptions,
  TransactionInstruction,
  PublicKey,
} from '@solana/web3.js';
import { Controller } from './controller';
import { MangoDepository } from './mango/depository';
import { MercurialVaultDepository } from './mercurial/depository';
import { Mango } from './mango';
import { findATAAddrSync, findMultipleATAAddSync } from './utils';
import NamespaceFactory from './namespace';
import { IDL as UXD_IDL } from './idl';
import type { Uxd as UXD_IDL_TYPE } from './idl';
import { PnLPolarity } from './interfaces';

export class UXDClient {
  public instruction: InstructionNamespace<UXD_IDL_TYPE>;

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
    return this.instruction.initializeController(controller.redeemableMintDecimals, {
      accounts: {
        authority,
        payer: payer ?? authority,
        controller: controller.pda,
        redeemableMint: controller.redeemableMintPda,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options,
    });
  }

  public createEditControllerInstruction(
    controller: Controller,
    authority: PublicKey,
    uiFields: {
      quoteMintAndRedeemSoftCap?: {
        value: number;
        depository: MangoDepository;
      };
      redeemableSoftCap?: number;
      redeemableGlobalSupplyCap?: number;
    },
    options: ConfirmOptions
  ) {
    const {
      quoteMintAndRedeemSoftCap,
      redeemableSoftCap,
      redeemableGlobalSupplyCap,
    } = uiFields;
    const fields = {
      quoteMintAndRedeemSoftCap: quoteMintAndRedeemSoftCap
        ? uiToNative(
          quoteMintAndRedeemSoftCap.value,
          quoteMintAndRedeemSoftCap.depository.quoteMintDecimals // special case
        )
        : null,
      redeemableSoftCap:
        redeemableSoftCap !== undefined
          ? uiToNative(redeemableSoftCap, controller.redeemableMintDecimals)
          : null,
      redeemableGlobalSupplyCap:
        redeemableGlobalSupplyCap !== undefined
          ? uiToNative(
            redeemableGlobalSupplyCap,
            controller.redeemableMintDecimals
          )
          : null,
    };
    return this.instruction.editController(fields, {
      accounts: {
        authority,
        controller: controller.pda,
      },
      options: options,
    });
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
      options,
    });
  }

  public createRegisterMercurialVaultDepositoryInstruction(
    controller: Controller,
    depository: MercurialVaultDepository,
    authority: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    return this.instruction.registerMercurialVaultDepository({
      accounts: {
        authority,
        payer: payer ?? authority,
        controller: controller.pda,
        depository: depository.pda,
        mercurialVault: depository.mercurialVault,
        mercurialVaultLpMint: depository.mercurialVaultLpMint,
        collateralMint: depository.collateralMint,
        depositoryLpTokenVault: depository.depositoryLpTokenVault,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options,
    });
  }

  public createMintWithMercurialVaultInstruction(
    controller: Controller,
    depository: MercurialVaultDepository,
    authority: PublicKey,
    collateralAmount: number,
    minimumLpTokenAmount: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    // TODO, do not use toNumber() to avoid overflow
    const nativeCollateralAmount = new BN(I80F48.fromNumber(collateralAmount).mul(I80F48.fromNumber(10 ** depository.collateralMintDecimals)).toNumber());
    const nativeMinimumLpTokenAmount = new BN(I80F48.fromNumber(minimumLpTokenAmount).mul(I80F48.fromNumber(10 ** depository.mercurialVaultLpMinDecimals)).toNumber());

    const [
      [userCollateralATA],
      [userRedeemableATA],
    ] = findMultipleATAAddSync(authority, [
      depository.collateralMint,
      controller.redeemableMintPda,
    ]);

    return this.instruction.mintWithMercurialVault(nativeCollateralAmount, nativeMinimumLpTokenAmount, {
      accounts: {
        user: authority,
        payer: payer ?? authority,
        controller: controller.pda,
        depository: depository.pda,
        redeemableMint: controller.redeemableMintPda,
        userCollateral: userCollateralATA,
        userRedeemable: userRedeemableATA,
        mercurialVault: depository.mercurialVault,
        mercurialVaultLpMint: depository.mercurialVaultLpMint,
        collateralMint: depository.collateralMint,
        depositoryLpTokenVault: depository.depositoryLpTokenVault,
        mercurialVaultProgramCollateralTokenVault: depository.mercurialVaultProgramCollateralTokenVault,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        mercurialVaultProgram: depository.mercurialVaultProgram,
      },
      options,
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
    const [[userCollateralATA], [userQuoteATA]] = findMultipleATAAddSync(user, [
      depository.collateralMint,
      depository.quoteMint,
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

    const perpSide = polarity === PnLPolarity.Positive ? 'short' : 'long'; //'sell' : 'buy';
    const limitPrice = (
      await depository.getLimitPrice(
        I80F48.fromNumber(slippage),
        perpSide,
        mango
      )
    ).toNumber();

    return this.instruction.rebalanceMangoDepositoryLite(
      maxRebalancingAmountNative,
      polarity == PnLPolarity.Positive ? { positive: {} } : { negative: {} },
      limitPrice,
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
        options,
      }
    );
  }

  public createDepositInsuranceToMangoDepositoryInstruction(
    insuranceDepositedAmount: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    authority: PublicKey,
    options: ConfirmOptions
  ): TransactionInstruction {
    const depositedTokenIndex = mango.group.getTokenIndex(depository.quoteMint);
    const mangoCacheAccount = mango.getMangoCacheAccount();
    const mangoRootBankAccount = mango.getRootBankForToken(depositedTokenIndex);
    const mangoNodeBankAccount = mango.getNodeBankFor(
      depositedTokenIndex,
      depository.quoteMint
    );
    const mangoDepositedVaultAccount = mango.getVaultFor(depositedTokenIndex);
    const [authorityQuoteATA] = findATAAddrSync(
      authority,
      depository.quoteMint
    );
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
        options,
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
    const [authorityQuoteATA] = findATAAddrSync(
      authority,
      depository.quoteMint
    );
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
        options,
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
    const [[userCollateralATA], [userRedeemableATA]] = findMultipleATAAddSync(
      user,
      [depository.collateralMint, controller.redeemableMintPda]
    );

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

    const limitPrice = (
      await depository.getLimitPrice(
        I80F48.fromNumber(slippage),
        'short',
        mango
      )
    ).toNumber();

    return this.instruction.mintWithMangoDepository(
      collateralAmountBN,
      limitPrice,
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
        options,
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
    const [[userCollateralATA], [userRedeemableATA]] = findMultipleATAAddSync(
      user,
      [depository.collateralMint, controller.redeemableMintPda]
    );

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

    const limitPrice = (
      await depository.getLimitPrice(I80F48.fromNumber(slippage), 'long', mango)
    ).toNumber();

    return this.instruction.redeemFromMangoDepository(
      redeemAmountBN,
      limitPrice,
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
        options,
      }
    );
  }

  public createQuoteMintWithMangoDepositoryInstruction(
    quoteAmount: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
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
    const [[userQuoteATA], [userRedeemableATA]] = findMultipleATAAddSync(user, [
      depository.quoteMint,
      controller.redeemableMintPda,
    ]);
    const quoteAmountNativeBN = uiToNative(
      quoteAmount,
      depository.quoteMintDecimals
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
        mangoProgram: mango.programId,
      },
      options,
    });
  }

  public createQuoteRedeemWithMangoDepositoryInstruction(
    redeemableAmount: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
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
    const [[userQuoteATA], [userRedeemableATA]] = findMultipleATAAddSync(user, [
      depository.quoteMint,
      controller.redeemableMintPda,
    ]);
    const redeemableAmountNativeBN = uiToNative(
      redeemableAmount,
      controller.redeemableMintDecimals
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
          mangoProgram: mango.programId,
        },
        options,
      }
    );
  }

  public createEditMangoDepositoryInstruction(
    controller: Controller,
    depository: MangoDepository,
    authority: PublicKey,
    uiFields: {
      quoteMintAndRedeemFee?: number;
    },
    options: ConfirmOptions
  ): TransactionInstruction {
    const { quoteMintAndRedeemFee } = uiFields;
    const fields = {
      quoteMintAndRedeemFee: quoteMintAndRedeemFee ?? null,
    };
    return this.instruction.editMangoDepository(fields, {
      accounts: {
        authority,
        controller: controller.pda,
        depository: depository.pda,
      },
      options: options,
    });
  }

  public createDisableDepositoryRegularMintingInstruction(
    disableMinting: boolean,
    controller: Controller,
    depository: MangoDepository,
    authority: PublicKey,
    options: ConfirmOptions
  ): TransactionInstruction {
    return this.instruction.disableDepositoryRegularMinting(disableMinting, {
      accounts: {
        authority: authority,
        controller: controller.pda,
        depository: depository.pda,
      },
      options,
    });
  }

  /**
   * @deprecated
   * for backward compatibility only
   * please use createEditControllerInstruction instead
   */
  public createSetMangoDepositoryQuoteMintAndRedeemSoftCapInstruction(
    quoteMintAndRedeemSoftCap: number,
    controller: Controller,
    depository: MangoDepository,
    authority: PublicKey,
    options: ConfirmOptions
  ): TransactionInstruction {
    return this.createEditControllerInstruction(
      controller,
      authority,
      {
        quoteMintAndRedeemSoftCap: {
          value: quoteMintAndRedeemSoftCap,
          depository,
        },
      },
      options
    );
  }

  /**
   * @deprecated
   * for backward compatibility only
   * please use createEditControllerInstruction instead
   */
  public createSetRedeemableGlobalSupplyCapInstruction(
    controller: Controller,
    authority: PublicKey,
    redeemableGlobalSupplyCap: number,
    options: ConfirmOptions
  ): TransactionInstruction {
    return this.createEditControllerInstruction(
      controller,
      authority,
      {
        redeemableGlobalSupplyCap,
      },
      options
    );
  }

  /**
   * @deprecated
   * for backward compatibility only
   * please use createEditControllerInstruction instead
   */
  public createSetMangoDepositoriesRedeemableSoftCapInstruction(
    controller: Controller,
    authority: PublicKey,
    redeemableSoftCap: number,
    options: ConfirmOptions
  ): TransactionInstruction {
    return this.createEditControllerInstruction(
      controller,
      authority,
      {
        redeemableSoftCap,
      },
      options
    );
  }

  /**
   * @deprecated
   * for backward compatibility only
   * please use createEditMangoDepositoryInstruction instead
   */
  public createSetMangoDepositoryQuoteMintAndRedeemFeeInstruction(
    quoteMintAndRedeemFee: number,
    controller: Controller,
    depository: MangoDepository,
    authority: PublicKey,
    options: ConfirmOptions
  ): TransactionInstruction {
    return this.createEditMangoDepositoryInstruction(
      controller,
      depository,
      authority,
      {
        quoteMintAndRedeemFee,
      },
      options
    );
  }
}
