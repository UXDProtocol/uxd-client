import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

// As in the rust programs, see there for details and explanations

export class ControllerAccount {
  bump!: number; // u8
  redeemableMintBump!: number; // u8
  version!: number; // u8
  authority!: PublicKey;
  redeemableMint!: PublicKey;
  redeemableMintDecimals!: number; // u16
  isFrozen!: boolean;
  redeemableGlobalSupplyCap!: BN; // u128
  redeemableCirculatingSupply!: BN; // u128
  registeredMercurialVaultDepositories!: PublicKey[];
  registeredMercurialVaultDepositoriesCount!: number; // u8
  registeredCredixLpDepositories!: PublicKey[];
  registeredCredixLpDepositoriesCount!: number; // u8
  profitsTotalCollected!: BN; // u128
  identityDepositoryWeightBps!: number; // u16
  mercurialVaultDepositoryWeightBps!: number; // u16
  credixLpDepositoryWeightBps!: number; // u16
  identityDepository!: PublicKey;
  mercurialVaultDepository!: PublicKey;
  credixLpDepository!: PublicKey;
  outflowLimitPerEpochAmount!: BN; // u64
  outflowLimitPerEpochBps!: number; // u16
  slotsPerEpoch!: BN; // u64
  epochOutflowAmount!: BN; // u64
  lastOutflowSlot!: BN; // u64
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
  profitsTotalCollected!: BN; // u128
  lastProfitsCollectionUnixTimestamp!: BN; // u64
  profitsBeneficiaryCollateral!: PublicKey;
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
  profitsTotalCollected!: BN; // u128
  profitsBeneficiaryCollateral!: PublicKey;
}

// V1
export class AlloyxVaultDepositoryAccount {
  bump!: number; // u8
  version!: number; // u8
  controller!: PublicKey;
  collateralMint!: PublicKey;
  depositoryCollateral!: PublicKey;
  depositoryShares!: PublicKey;
  alloyxVaultInfo!: PublicKey;
  alloyxVaultCollateral!: PublicKey;
  alloyxVaultShares!: PublicKey;
  alloyxVaultMint!: PublicKey;
  redeemableAmountUnderManagementCap!: BN; // u64
  mintingFeeInBps!: number; // u8
  redeemingFeeInBps!: number; // u8
  mintingDisabled!: boolean;
  collateralAmountDeposited!: BN; // u64
  redeemableAmountUnderManagement!: BN; // u64
  mintingFeeTotalAccrued!: BN; // u64
  redeemingFeeTotalAccrued!: BN; // u64
  profitsTotalCollected!: BN; // u64
  profitsBeneficiaryCollateral!: PublicKey;
}
