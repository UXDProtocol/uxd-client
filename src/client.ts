import { InstructionNamespace } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
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
    const {
      redeemableGlobalSupplyCap,
    } = uiFields;
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
}
