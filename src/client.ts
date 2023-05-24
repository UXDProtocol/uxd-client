import { InstructionNamespace } from '@project-serum/anchor';
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
import { MercurialVaultDepository } from './mercurial/depository';
import { findATAAddrSync, findMultipleATAAddSync, uiToNative } from './utils';
import NamespaceFactory from './namespace';
import { IDL as UXD_IDL } from './idl';
import type { Uxd as UXD_IDL_TYPE } from './idl';
import { IdentityDepository } from './identity/depository';
import { CredixLpDepository } from './credix_lp/depository';

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
    return this.instruction.initializeController(
      controller.redeemableMintDecimals,
      {
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
      }
    );
  }

  public createEditControllerInstruction(
    controller: Controller,
    authority: PublicKey,
    uiFields: {
      redeemableGlobalSupplyCap?: number;
      depositoriesRoutingWeightBps?: {
        identityDepositoryWeightBps: number;
        mercurialVaultDepositoryWeightBps: number;
        credixLpDepositoryWeightBps: number;
      };
      routerDepositories?: {
        identityDepository: PublicKey;
        mercurialVaultDepository: PublicKey;
        credixLpDepository: PublicKey;
      };
    },
    options: ConfirmOptions
  ) {
    const {
      redeemableGlobalSupplyCap,
      depositoriesRoutingWeightBps,
      routerDepositories,
    } = uiFields;
    const fields = {
      redeemableGlobalSupplyCap:
        typeof redeemableGlobalSupplyCap !== 'undefined'
          ? uiToNative(
              redeemableGlobalSupplyCap,
              controller.redeemableMintDecimals
            )
          : null,
      depositoriesRoutingWeightBps:
        depositoriesRoutingWeightBps !== undefined
          ? depositoriesRoutingWeightBps
          : null,
      routerDepositories:
        routerDepositories !== undefined ? routerDepositories : null,
    };
    return this.instruction.editController(fields, {
      accounts: {
        authority,
        controller: controller.pda,
      },
      options,
    });
  }

  public createInitializeIdentityDepositoryInstruction(
    controller: Controller,
    depository: IdentityDepository,
    authority: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    return this.instruction.initializeIdentityDepository({
      accounts: {
        authority,
        payer: payer ?? authority,
        controller: controller.pda,
        depository: depository.pda,
        collateralVault: depository.collateralVaultPda,
        collateralMint: depository.collateralMint,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options,
    });
  }

  public createMintWithIdentityDepositoryInstruction(
    controller: Controller,
    depository: IdentityDepository,
    user: PublicKey,
    collateralAmount: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const nativeCollateralAmount = uiToNative(
      collateralAmount,
      depository.collateralMintDecimals
    );

    const [[userCollateralATA], [userRedeemableATA]] = findMultipleATAAddSync(
      user,
      [depository.collateralMint, controller.redeemableMintPda]
    );

    return this.instruction.mintWithIdentityDepository(nativeCollateralAmount, {
      accounts: {
        user,
        payer: payer ?? user,
        controller: controller.pda,
        depository: depository.pda,
        collateralVault: depository.collateralVaultPda,
        redeemableMint: controller.redeemableMintPda,
        userCollateral: userCollateralATA,
        userRedeemable: userRedeemableATA,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      options,
    });
  }

  public createRedeemFromIdentityDepositoryInstruction(
    controller: Controller,
    depository: IdentityDepository,
    user: PublicKey,
    redeemableAmount: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const nativeRedeemableAmount = uiToNative(
      redeemableAmount,
      controller.redeemableMintDecimals
    );
    const [[userCollateralATA], [userRedeemableATA]] = findMultipleATAAddSync(
      user,
      [depository.collateralMint, controller.redeemableMintPda]
    );

    return this.instruction.redeemFromIdentityDepository(
      nativeRedeemableAmount,
      {
        accounts: {
          user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          collateralVault: depository.collateralVaultPda,
          redeemableMint: controller.redeemableMintPda,
          userCollateral: userCollateralATA,
          userRedeemable: userRedeemableATA,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
        options,
      }
    );
  }

  public createRegisterMercurialVaultDepositoryInstruction(
    controller: Controller,
    depository: MercurialVaultDepository,
    authority: PublicKey,
    mintingFeeInBps: number,
    redeemingFeeInBps: number,
    redeemableAmountUnderManagementCap: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const nativeRedeemableAmountUnderManagementCap = uiToNative(
      redeemableAmountUnderManagementCap,
      controller.redeemableMintDecimals
    );

    return this.instruction.registerMercurialVaultDepository(
      mintingFeeInBps,
      redeemingFeeInBps,
      nativeRedeemableAmountUnderManagementCap,
      {
        accounts: {
          authority,
          payer: payer ?? authority,
          controller: controller.pda,
          depository: depository.pda,
          mercurialVault: depository.mercurialVault,
          mercurialVaultLpMint: depository.mercurialVaultLpMint.mint,
          collateralMint: depository.collateralMint.mint,
          depositoryLpTokenVault: depository.depositoryLpTokenVault,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
        options,
      }
    );
  }

  public createCollectProfitsOfMercurialVaultDepositoryInstruction(
    controller: Controller,
    depository: MercurialVaultDepository,
    profitsBeneficiaryCollateral: PublicKey,
    options: ConfirmOptions,
    payer: PublicKey
  ): TransactionInstruction {
    return this.instruction.collectProfitsOfMercurialVaultDepository({
      accounts: {
        payer: payer,
        controller: controller.pda,
        depository: depository.pda,
        collateralMint: depository.collateralMint.mint,
        profitsBeneficiaryCollateral,
        depositoryLpTokenVault: depository.depositoryLpTokenVault,
        mercurialVault: depository.mercurialVault,
        mercurialVaultLpMint: depository.mercurialVaultLpMint.mint,
        mercurialVaultCollateralTokenSafe:
          depository.mercurialVaultCollateralTokenSafe,
        mercurialVaultProgram: MercurialVaultDepository.mercurialVaultProgramId,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      options,
    });
  }

  public createMintWithMercurialVaultDepositoryInstruction(
    controller: Controller,
    depository: MercurialVaultDepository,
    user: PublicKey,
    collateralAmount: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const nativeCollateralAmount = uiToNative(
      collateralAmount,
      depository.collateralMint.decimals
    );

    const [[userCollateralATA], [userRedeemableATA]] = findMultipleATAAddSync(
      user,
      [depository.collateralMint.mint, controller.redeemableMintPda]
    );

    return this.instruction.mintWithMercurialVaultDepository(
      nativeCollateralAmount,
      {
        accounts: {
          user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          redeemableMint: controller.redeemableMintPda,
          userRedeemable: userRedeemableATA,
          userCollateral: userCollateralATA,
          collateralMint: depository.collateralMint.mint,
          mercurialVault: depository.mercurialVault,
          mercurialVaultLpMint: depository.mercurialVaultLpMint.mint,
          depositoryLpTokenVault: depository.depositoryLpTokenVault,
          mercurialVaultCollateralTokenSafe:
            depository.mercurialVaultCollateralTokenSafe,
          mercurialVaultProgram:
            MercurialVaultDepository.mercurialVaultProgramId,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
        options,
      }
    );
  }

  public createRedeemFromMercurialVaultDepositoryInstruction(
    controller: Controller,
    depository: MercurialVaultDepository,
    user: PublicKey,
    redeemableAmount: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const nativeRedeemableAmount = uiToNative(
      redeemableAmount,
      controller.redeemableMintDecimals
    );

    const [[userCollateralATA], [userRedeemableATA]] = findMultipleATAAddSync(
      user,
      [depository.collateralMint.mint, controller.redeemableMintPda]
    );

    return this.instruction.redeemFromMercurialVaultDepository(
      nativeRedeemableAmount,
      {
        accounts: {
          user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          redeemableMint: controller.redeemableMintPda,
          userRedeemable: userRedeemableATA,
          userCollateral: userCollateralATA,
          collateralMint: depository.collateralMint.mint,
          mercurialVault: depository.mercurialVault,
          mercurialVaultLpMint: depository.mercurialVaultLpMint.mint,
          depositoryLpTokenVault: depository.depositoryLpTokenVault,
          mercurialVaultCollateralTokenSafe:
            depository.mercurialVaultCollateralTokenSafe,
          mercurialVaultProgram:
            MercurialVaultDepository.mercurialVaultProgramId,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
        options,
      }
    );
  }

  public createEditMercurialVaultDepositoryInstruction(
    controller: Controller,
    depository: MercurialVaultDepository,
    authority: PublicKey,
    uiFields: {
      redeemableAmountUnderManagementCap?: number;
      mintingFeeInBps?: number;
      redeemingFeeInBps?: number;
      mintingDisabled?: boolean;
      profitsBeneficiaryCollateral?: PublicKey;
    },
    options: ConfirmOptions
  ): TransactionInstruction {
    const {
      redeemableAmountUnderManagementCap,
      mintingFeeInBps,
      redeemingFeeInBps,
      mintingDisabled,
      profitsBeneficiaryCollateral,
    } = uiFields;
    const fields = {
      redeemableAmountUnderManagementCap:
        typeof redeemableAmountUnderManagementCap !== 'undefined'
          ? uiToNative(
              redeemableAmountUnderManagementCap,
              controller.redeemableMintDecimals
            )
          : null,
      mintingFeeInBps:
        typeof mintingFeeInBps !== 'undefined' ? mintingFeeInBps : null,
      redeemingFeeInBps:
        typeof redeemingFeeInBps !== 'undefined' ? redeemingFeeInBps : null,
      mintingDisabled:
        typeof mintingDisabled !== 'undefined' ? mintingDisabled : null,
      profitsBeneficiaryCollateral:
        typeof profitsBeneficiaryCollateral !== 'undefined'
          ? profitsBeneficiaryCollateral
          : null,
    };
    return this.instruction.editMercurialVaultDepository(fields, {
      accounts: {
        authority,
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

  public createEditIdentityDepositoryInstruction(
    controller: Controller,
    depository: IdentityDepository,
    authority: PublicKey,
    uiFields: {
      redeemableAmountUnderManagementCap?: number;
      mintingDisabled?: boolean;
    },
    options: ConfirmOptions
  ): TransactionInstruction {
    const { redeemableAmountUnderManagementCap, mintingDisabled } = uiFields;
    const fields = {
      redeemableAmountUnderManagementCap:
        typeof redeemableAmountUnderManagementCap !== 'undefined'
          ? uiToNative(
              redeemableAmountUnderManagementCap,
              controller.redeemableMintDecimals
            )
          : null,
      mintingDisabled:
        typeof mintingDisabled !== 'undefined' ? mintingDisabled : null,
    };
    return this.instruction.editIdentityDepository(fields, {
      accounts: {
        authority,
        controller: controller.pda,
        depository: depository.pda,
      },
      options,
    });
  }

  public createEditCredixLpDepositoryInstruction(
    controller: Controller,
    depository: CredixLpDepository,
    authority: PublicKey,
    uiFields: {
      redeemableAmountUnderManagementCap?: number;
      mintingFeeInBps?: number;
      redeemingFeeInBps?: number;
      mintingDisabled?: boolean;
      profitsBeneficiaryCollateral?: PublicKey;
    },
    options: ConfirmOptions
  ): TransactionInstruction {
    const {
      redeemableAmountUnderManagementCap,
      mintingFeeInBps,
      redeemingFeeInBps,
      mintingDisabled,
      profitsBeneficiaryCollateral,
    } = uiFields;
    const fields = {
      redeemableAmountUnderManagementCap:
        redeemableAmountUnderManagementCap !== undefined
          ? uiToNative(
              redeemableAmountUnderManagementCap,
              controller.redeemableMintDecimals
            )
          : null,
      mintingFeeInBps: mintingFeeInBps !== undefined ? mintingFeeInBps : null,
      redeemingFeeInBps:
        redeemingFeeInBps !== undefined ? redeemingFeeInBps : null,
      mintingDisabled: mintingDisabled !== undefined ? mintingDisabled : null,
      profitsBeneficiaryCollateral:
        profitsBeneficiaryCollateral !== undefined
          ? profitsBeneficiaryCollateral
          : null,
    };
    return this.instruction.editCredixLpDepository(fields, {
      accounts: {
        authority,
        controller: controller.pda,
        depository: depository.pda,
      },
      options,
    });
  }

  public createRegisterCredixLpDepositoryInstruction(
    controller: Controller,
    depository: CredixLpDepository,
    authority: PublicKey,
    mintingFeeInBps: number,
    redeemingFeeInBps: number,
    redeemableAmountUnderManagementCap: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const nativeRedeemableAmountUnderManagementCap = uiToNative(
      redeemableAmountUnderManagementCap,
      controller.redeemableMintDecimals
    );

    return this.instruction.registerCredixLpDepository(
      mintingFeeInBps,
      redeemingFeeInBps,
      nativeRedeemableAmountUnderManagementCap,
      {
        accounts: {
          authority,
          payer: payer ?? authority,
          controller: controller.pda,
          depository: depository.pda,
          collateralMint: depository.collateralMint,
          depositoryCollateral: depository.depositoryCollateral,
          depositoryShares: depository.depositoryShares,
          credixProgramState: depository.credixProgramState,
          credixGlobalMarketState: depository.credixGlobalMarketState,
          credixSigningAuthority: depository.credixSigningAuthority,
          credixLiquidityCollateral: depository.credixLiquidityCollateral,
          credixSharesMint: depository.credixSharesMint,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
        options,
      }
    );
  }

  public createMintWithCredixLpDepositoryInstruction(
    controller: Controller,
    depository: CredixLpDepository,
    user: PublicKey,
    collateralAmount: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const nativeCollateralAmount = uiToNative(
      collateralAmount,
      depository.collateralDecimals
    );

    const redeemableMint = controller.redeemableMintPda;
    const userRedeemable = findATAAddrSync(user, redeemableMint)[0];

    const collateralMint = depository.collateralMint;
    const userCollateral = findATAAddrSync(user, collateralMint)[0];

    return this.instruction.mintWithCredixLpDepository(nativeCollateralAmount, {
      accounts: {
        user,
        payer: payer ?? user,
        controller: controller.pda,
        depository: depository.pda,
        depositoryCollateral: depository.depositoryCollateral,
        depositoryShares: depository.depositoryShares,
        redeemableMint,
        userRedeemable,
        collateralMint,
        userCollateral,
        credixGlobalMarketState: depository.credixGlobalMarketState,
        credixSigningAuthority: depository.credixSigningAuthority,
        credixLiquidityCollateral: depository.credixLiquidityCollateral,
        credixSharesMint: depository.credixSharesMint,
        credixPass: depository.credixPass,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        credixProgram: depository.credixProgramId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options,
    });
  }

  public createRedeemFromCredixLpDepositoryInstruction(
    controller: Controller,
    depository: CredixLpDepository,
    user: PublicKey,
    redeemableAmount: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const nativeRedeemableAmount = uiToNative(
      redeemableAmount,
      controller.redeemableMintDecimals
    );

    const redeemableMint = controller.redeemableMintPda;
    const userRedeemable = findATAAddrSync(user, redeemableMint)[0];

    const collateralMint = depository.collateralMint;
    const userCollateral = findATAAddrSync(user, collateralMint)[0];

    return this.instruction.redeemFromCredixLpDepository(
      nativeRedeemableAmount,
      {
        accounts: {
          user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          depositoryCollateral: depository.depositoryCollateral,
          depositoryShares: depository.depositoryShares,
          redeemableMint,
          userRedeemable,
          collateralMint,
          userCollateral,
          credixProgramState: depository.credixProgramState,
          credixGlobalMarketState: depository.credixGlobalMarketState,
          credixSigningAuthority: depository.credixSigningAuthority,
          credixLiquidityCollateral: depository.credixLiquidityCollateral,
          credixSharesMint: depository.credixSharesMint,
          credixPass: depository.credixPass,
          credixTreasuryCollateral: depository.credixTreasuryCollateral,
          credixMultisigKey: depository.credixMultisigKey,
          credixMultisigCollateral: depository.credixMultisigCollateral,
          systemProgram: SystemProgram.programId,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          credixProgram: depository.credixProgramId,
          rent: SYSVAR_RENT_PUBKEY,
        },
        options,
      }
    );
  }

  public createCollectProfitsOfCredixLpDepositoryInstruction(
    controller: Controller,
    depository: CredixLpDepository,
    payer: PublicKey,
    profitsBeneficiaryCollateral: PublicKey,
    options: ConfirmOptions
  ): TransactionInstruction {
    return this.instruction.collectProfitsOfCredixLpDepository({
      accounts: {
        payer: payer,
        controller: controller.pda,
        depository: depository.pda,
        depositoryCollateral: depository.depositoryCollateral,
        depositoryShares: depository.depositoryShares,
        collateralMint: depository.collateralMint,
        credixProgramState: depository.credixProgramState,
        credixGlobalMarketState: depository.credixGlobalMarketState,
        credixSigningAuthority: depository.credixSigningAuthority,
        credixLiquidityCollateral: depository.credixLiquidityCollateral,
        credixSharesMint: depository.credixSharesMint,
        credixPass: depository.credixPass,
        credixTreasuryCollateral: depository.credixTreasuryCollateral,
        credixMultisigKey: depository.credixMultisigKey,
        credixMultisigCollateral: depository.credixMultisigCollateral,
        profitsBeneficiaryCollateral: profitsBeneficiaryCollateral,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        credixProgram: depository.credixProgramId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options,
    });
  }

  public createRebalanceRequestCreateFromCredixLpDepositoryInstruction(
    controller: Controller,
    identityDepository: IdentityDepository,
    mercurialVaultDepository: MercurialVaultDepository,
    credixLpDepository: CredixLpDepository,
    payer: PublicKey,
    profitsBeneficiaryCollateral: PublicKey,
    options: ConfirmOptions
  ): TransactionInstruction {
    return this.instruction.rebalanceRequestCreateFromCredixLpDepository({
      accounts: {
        payer: payer,
        controller: controller.pda,
        identityDepository: identityDepository.pda,
        mercurialVaultDepository: mercurialVaultDepository.pda,
        depository: credixLpDepository.pda,
        depositoryCollateral: depository.depositoryCollateral,
        depositoryShares: depository.depositoryShares,
        collateralMint: depository.collateralMint,
        credixProgramState: depository.credixProgramState,
        credixGlobalMarketState: depository.credixGlobalMarketState,
        credixSigningAuthority: depository.credixSigningAuthority,
        credixLiquidityCollateral: depository.credixLiquidityCollateral,
        credixSharesMint: depository.credixSharesMint,
        credixPass: depository.credixPass,
        credixTreasuryCollateral: depository.credixTreasuryCollateral,
        credixMultisigKey: depository.credixMultisigKey,
        credixMultisigCollateral: depository.credixMultisigCollateral,
        profitsBeneficiaryCollateral: profitsBeneficiaryCollateral,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        credixProgram: depository.credixProgramId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options,
    });
  }

  public createFreezeProgramInstruction(
    freeze: boolean,
    controller: Controller,
    authority: PublicKey,
    options: ConfirmOptions
  ): TransactionInstruction {
    return this.instruction.freezeProgram(freeze, {
      accounts: {
        authority: authority,
        controller: controller.pda,
      },
      options: options,
    });
  }
}
