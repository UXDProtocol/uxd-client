import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

// As in the rust programs, see there for details and explanations

export class ControllerAccount {
  version!: number; // u8
  authority!: PublicKey;
  redeemableMint!: PublicKey;
  redeemableMintDecimals!: number; // u16
  registeredMangoDepositories!: PublicKey[]; // 8 entries max currently
  registeredMangoDepositoriesCount!: number; // u8
  redeemableGlobalSupplyCap!: BN; // u128
  mangoDepositoriesRedeemableSoftCap!: BN; // u64
  redeemableCirculatingSupply!: BN; // u128
  mangoDepositoriesQuoteRedeemableSoftCap!: BN; // u64
}

// V1
export class MangoDepositoryAccountV1 {
  bump!: number; // u8
  collateralPassthroughBump!: number; // u8
  insurancePassthroughBump!: number; // u8
  mangoAccountBump!: number; // u8
  version!: number; // u8
  collateralMint!: PublicKey;
  collateralPassthrough!: PublicKey;
  insuranceMint!: PublicKey;
  insurancePassthrough!: PublicKey;
  mangoAccount!: PublicKey;
  controller!: PublicKey;
  insuranceAmountDeposited!: BN; // u128
  collateralAmountDeposited!: BN; // u128
  redeemableAmountUnderManagement!: BN; // u128
  totalAmountPaidTakerFee!: BN; // u128
}

// V2
export class MangoDepositoryAccount {
  version!: number; // u8
  collateralMint!: PublicKey;
  mangoAccount!: PublicKey;
  controller!: PublicKey;
  insuranceAmountDeposited!: BN; // u128
  collateralAmountDeposited!: BN; // u128
  redeemableAmountUnderManagement!: BN; // u128
  totalAmountPaidTakerFee!: BN; // u128
  quoteMint!: PublicKey;
  quoteMintDecimals!: number; // u8
  totalAmountRebalanced!: BN; // u128
  netQuoteMinted!: BN; // i128
  quoteMintAndRedeemFee!: number; // u8
  totalQuoteMintAndRedeemFees!: BN; // u128
  regularMintingDisabled!: boolean;
  redeemableAmountUnderManagementCap!: BN; // u128
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

export class MaplePoolDepositoryAccount {
  bump!: number; // u8
  version!: number; // u8
  controller!: PublicKey;
  collateralMint!: PublicKey;
  depositoryCollateral!: PublicKey;
  depositoryCollateralBump!: number; // u8
  maplePool!: PublicKey;
  maplePoolLocker!: PublicKey;
  mapleGlobals!: PublicKey;
  mapleLender!: PublicKey;
  mapleSharesMint!: PublicKey;
  mapleLockedShares!: PublicKey;
  mapleLenderShares!: PublicKey;
  redeemableAmountUnderManagementCap!: BN; // u128
  mintingFeeInBps!: number; // u8
  redeemingFeeInBps!: number; // u8
  mintingDisabled!: boolean;
  collateralAmountDeposited!: BN; // u128
  redeemableAmountUnderManagement!: BN; // u128
  mintingFeeTotalAccrued!: BN; // u128
  redeemingFeeTotalAccrued!: BN; // u128
}

export enum PnLPolarity {
  Positive = `Positive`,
  Negative = `Negative`,
}
