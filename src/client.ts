import { BN, InstructionNamespace } from '@project-serum/anchor';
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
    const supplyCapAmountNativeUnits = new BN(
      supplyCapAmount * 10 ** controller.redeemableMintDecimals
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
    const supplySoftCapAmountNativeUnits = new BN(
      supplySoftCapAmount * 10 ** controller.redeemableMintDecimals
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
        depositoryMangoAccount: depository.mangoAccountPda,
        mangoGroup: mango.group.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        mangoProgram: mango.programId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options: options,
    });
  }

  public createRebalanceMangoDepositoryLiteInstruction(
    maxRebalancingAmount: number,
    slippage: number,
    polarity: PnLPolarity,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const userCollateralATA = findATAAddrSync(
      user,
      depository.collateralMint
    )[0];
    const userQuoteATA = findATAAddrSync(user, depository.quoteMint)[0];
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
    const maxRebalancingAmountNative = new BN(
      maxRebalancingAmount * 10 ** depository.quoteMintDecimals
    );
    return this.instruction.rebalanceMangoDepositoryLite(
      maxRebalancingAmountNative,
      polarity == PnLPolarity.Positive ? { positive: {} } : { negative: {} },
      slippage,
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
          depositoryMangoAccount: depository.mangoAccountPda,
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
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          mangoProgram: mango.programId,
          rent: SYSVAR_RENT_PUBKEY,
        },
        options: options,
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
    // mango.groupConfig.tokens.forEach((config, index) => {
    //   console.log(`TOKENS config ${config}, mint ${config.mintKey},  index ${index}`);
    // });
    const depositedTokenIndex = mango.group.getTokenIndex(depository.quoteMint);
    const mangoCacheAccount = mango.getMangoCacheAccount();
    const mangoRootBankAccount = mango.getRootBankForToken(depositedTokenIndex);
    const mangoNodeBankAccount = mango.getNodeBankFor(
      depositedTokenIndex,
      depository.quoteMint
    );
    const mangoDepositedVaultAccount = mango.getVaultFor(depositedTokenIndex);
    const authorityQuoteATA = findATAAddrSync(
      authority,
      depository.quoteMint
    )[0];
    const insuranceAmountBN = new BN(
      insuranceDepositedAmount * 10 ** depository.quoteMintDecimals
    );
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
          depositoryMangoAccount: depository.mangoAccountPda,
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
    const insuranceAmountBN = new BN(
      insuranceWithdrawnAmount * 10 ** depository.quoteMintDecimals
    );
    return this.instruction.withdrawInsuranceFromMangoDepository(
      insuranceAmountBN,
      {
        accounts: {
          authority: authority,
          controller: controller.pda,
          depository: depository.pda,
          collateralMint: depository.collateralMint,
          quoteMint: depository.quoteMint,
          authorityQuote: authorityQuoteATA,
          depositoryMangoAccount: depository.mangoAccountPda,
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
          //
          rent: SYSVAR_RENT_PUBKEY,
        },
        options: options,
      }
    );
  }

  public createMintWithMangoDepositoryInstruction(
    collateralAmount: number,
    slippage: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
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
    const userCollateralATA = findATAAddrSync(
      user,
      depository.collateralMint
    )[0];
    const userRedeemableATA = findATAAddrSync(
      user,
      controller.redeemableMintPda
    )[0];

    const collateralAmountBN = new BN(
      collateralAmount * 10 ** depository.collateralMintDecimals
    );
    return this.instruction.mintWithMangoDepository(
      collateralAmountBN,
      slippage,
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
          depositoryMangoAccount: depository.mangoAccountPda,
          // mango accounts for CPI
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
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          mangoProgram: mango.programId,
          //
          rent: SYSVAR_RENT_PUBKEY,
        },
        options: options,
      }
    );
  }

  public createRedeemFromMangoDepositoryInstruction(
    amountRedeemable: number,
    slippage: number,
    controller: Controller,
    depository: MangoDepository,
    mango: Mango,
    user: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
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
    const userCollateralATA = findATAAddrSync(
      user,
      depository.collateralMint
    )[0];
    // Redeemable ATA
    const userRedeemableATA = findATAAddrSync(
      user,
      controller.redeemableMintPda
    )[0];
    const redeemAmount = new BN(
      amountRedeemable * 10 ** controller.redeemableMintDecimals
    );
    return this.instruction.redeemFromMangoDepository(redeemAmount, slippage, {
      accounts: {
        user,
        payer: payer ?? user,
        controller: controller.pda,
        depository: depository.pda,
        collateralMint: depository.collateralMint,
        redeemableMint: controller.redeemableMintPda,
        userCollateral: userCollateralATA,
        userRedeemable: userRedeemableATA,
        depositoryMangoAccount: depository.mangoAccountPda,
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
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        mangoProgram: mango.programId,
        //
        rent: SYSVAR_RENT_PUBKEY,
      },
      options: options,
    });
  }
}
