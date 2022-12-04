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
import { findMultipleATAAddSync, uiToNative } from './utils';
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
    },
    options: ConfirmOptions
  ) {
    const { redeemableGlobalSupplyCap } = uiFields;
    const fields = {
      redeemableGlobalSupplyCap:
        typeof redeemableGlobalSupplyCap !== 'undefined'
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
        user: user,
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
          user: user,
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
    const redeemableAmountUnderManagementCapBN = uiToNative(
      redeemableAmountUnderManagementCap,
      controller.redeemableMintDecimals
    );

    return this.instruction.registerMercurialVaultDepository(
      mintingFeeInBps,
      redeemingFeeInBps,
      redeemableAmountUnderManagementCapBN,
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

  public createMintWithMercurialVaultDepositoryInstruction(
    controller: Controller,
    depository: MercurialVaultDepository,
    authority: PublicKey,
    collateralAmount: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const nativeCollateralAmount = uiToNative(
      collateralAmount,
      depository.collateralMint.decimals
    );

    const [[userCollateralATA], [userRedeemableATA]] = findMultipleATAAddSync(
      authority,
      [depository.collateralMint.mint, controller.redeemableMintPda]
    );

    return this.instruction.mintWithMercurialVaultDepository(
      nativeCollateralAmount,
      {
        accounts: {
          user: authority,
          payer: payer ?? authority,
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
    authority: PublicKey,
    redeemableAmount: number,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const nativeRedeemableAmount = uiToNative(
      redeemableAmount,
      controller.redeemableMintDecimals
    );

    const [[userCollateralATA], [userRedeemableATA]] = findMultipleATAAddSync(
      authority,
      [depository.collateralMint.mint, controller.redeemableMintPda]
    );

    return this.instruction.redeemFromMercurialVaultDepository(
      nativeRedeemableAmount,
      {
        accounts: {
          user: authority,
          payer: payer ?? authority,
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
    },
    options: ConfirmOptions
  ): TransactionInstruction {
    const {
      redeemableAmountUnderManagementCap,
      mintingFeeInBps,
      redeemingFeeInBps,
      mintingDisabled,
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
    };
    return this.instruction.editMercurialVaultDepository(fields, {
      accounts: {
        authority,
        controller: controller.pda,
        depository: depository.pda,
      },
      options: options,
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
      options: options,
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
    },
    options: ConfirmOptions
  ): TransactionInstruction {
    const {
      redeemableAmountUnderManagementCap,
      mintingFeeInBps,
      redeemingFeeInBps,
      mintingDisabled,
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
    };
    return this.instruction.editCredixLpDepository(fields, {
      accounts: {
        authority,
        controller: controller.pda,
        depository: depository.pda,
      },
      options: options,
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
    const redeemableAmountUnderManagementCapBN = uiToNative(
      redeemableAmountUnderManagementCap,
      controller.redeemableMintDecimals
    );

    return this.instruction.registerCredixLpDepository(
      mintingFeeInBps,
      redeemingFeeInBps,
      redeemableAmountUnderManagementCapBN,
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

    const collateralMint = depository.collateralMint;
    const redeemableMint = controller.redeemableMintPda;

    const [[userCollateral], [userRedeemable]] = findMultipleATAAddSync(user, [
      collateralMint,
      redeemableMint,
    ]);

    return this.instruction.mintWithCredixLpDepository(nativeCollateralAmount, {
      accounts: {
        user: user,
        payer: payer ?? user,
        controller: controller.pda,
        depository: depository.pda,
        depositoryCollateral: depository.depositoryCollateral,
        depositoryShares: depository.depositoryShares,
        redeemableMint: redeemableMint,
        userRedeemable: userRedeemable,
        collateralMint: collateralMint,
        userCollateral: userCollateral,
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

    const collateralMint = depository.collateralMint;
    const redeemableMint = controller.redeemableMintPda;

    const [[userCollateral], [userRedeemable]] = findMultipleATAAddSync(user, [
      collateralMint,
      redeemableMint,
    ]);

    return this.instruction.redeemFromCredixLpDepository(
      nativeRedeemableAmount,
      {
        accounts: {
          user: user,
          payer: payer ?? user,
          controller: controller.pda,
          depository: depository.pda,
          depositoryCollateral: depository.depositoryCollateral,
          depositoryShares: depository.depositoryShares,
          redeemableMint: redeemableMint,
          userRedeemable: userRedeemable,
          collateralMint: collateralMint,
          userCollateral: userCollateral,
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

  public createCollectProfitOfCredixLpDepositoryInstruction(
    controller: Controller,
    depository: CredixLpDepository,
    authority: PublicKey,
    options: ConfirmOptions,
    payer?: PublicKey
  ): TransactionInstruction {
    const collateralMint = depository.collateralMint;
    return this.instruction.collectProfitOfCredixLpDepository({
      accounts: {
        authority: authority,
        payer: payer ?? authority,
        controller: controller.pda,
        depository: depository.pda,
        depositoryCollateral: depository.depositoryCollateral,
        depositoryShares: depository.depositoryShares,
        collateralMint: collateralMint,
        credixProgramState: depository.credixProgramState,
        credixGlobalMarketState: depository.credixGlobalMarketState,
        credixSigningAuthority: depository.credixSigningAuthority,
        credixLiquidityCollateral: depository.credixLiquidityCollateral,
        credixSharesMint: depository.credixSharesMint,
        credixPass: depository.credixPass,
        credixTreasuryCollateral: depository.credixTreasuryCollateral,
        credixMultisigKey: depository.credixMultisigKey,
        credixMultisigCollateral: depository.credixMultisigCollateral,
        authorityCollateral: depository.authorityCollateral,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        credixProgram: depository.credixProgramId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      options,
    });
  }
}
