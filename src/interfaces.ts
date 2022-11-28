import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

// As in the rust programs, see there for details and explanations

export class ControllerAccount {
  version!: number; // u8
  authority!: PublicKey;
  redeemableMint!: PublicKey;
  redeemableMintDecimals!: number; // u16
  redeemableGlobalSupplyCap!: BN; // u128
  redeemableCirculatingSupply!: BN; // u128
}

// V1
export class MercurialVaultDepositoryAccount {
  bump!: number; // u8
  version!: number; // u8
  collateralMint!: PublicKey;
  collateralMintDecimals!: number; //u8
  controller!: PublicKey;
  collateralAmountDeposited!: BN; // u128
  redeemableAmountUnderManagement!: BN; // u128
  mercurialVault!: PublicKey;
  mercurialVaultLpMint!: PublicKey;
  mercurialVaultLpMintDecimals!: number; // u8
  lpTokenVault!: PublicKey;
  lpTokenVaultBump!: number; // u8
  mintingFeeInBps!: number; // u8
  redeemingFeeInBps!: number; // u8
  mintingFeeTotalAccrued!: BN; // u128
  redeemingFeeTotalAccrued!: BN; // u128
  redeemableAmountUnderManagementCap!: BN; // u128
  mintingDisabled!: boolean;
}

// V1
export class IdentityDepositoryAccount {
  bump!: number; // u8
  version!: number; // u8
  collateralMint!: PublicKey;
  collateralMintDecimal!: number; // u8
  collateralVault!: PublicKey;
  collateralVaultBump!: number; // u8
  collateralAmountDeposited!: BN; // u128
  redeemableAmountUnderManagement!: BN; // u128
  redeemableAmountUnderManagementCap!: BN; // u128
  mintingDisabled!: boolean;
}

// V1
export class CredixLpDepositoryAccount {
  bump!: number; // u8
  version!: number; // u8
  controller!: PublicKey;
  collateralMint!: PublicKey;
  depositoryCollateral!: PublicKey;
  depositoryShares!: PublicKey;
  credixProgramState!: PublicKey;
  credixGlobalMarketState!: PublicKey;
  credixSigningAuthority!: PublicKey;
  credixLiquidityCollateral!: PublicKey;
  credixSharesMint!: PublicKey;
  redeemableAmountUnderManagementCap!: BN; // u128
  mintingFeeInBps!: number; // u8
  redeemingFeeInBps!: number; // u8
  mintingDisabled!: boolean;
  collateralAmountDeposited!: BN; // u128
  redeemableAmountUnderManagement!: BN; // u128
  mintingFeeTotalAccrued!: BN; // u128
  redeemingFeeTotalAccrued!: BN; // u128
  profitTreasuryCollateral!: PublicKey;
  profitTreasuryTotalCollected!: BN; // u128
}
