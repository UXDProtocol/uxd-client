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
}

// V1
export class MercurialVaultDepositoryAccount {
  bump!: number; // u8
  version!: number; // u8
  collateralMint!: PublicKey;
  collateralMintDecimals!: number; //u8
  controller!: PublicKey;
  collateralAmountDeposited!: BN; // u128
  mintedRedeemableAmount!: BN; // u128
  mercurialVault!: PublicKey;
  mercurialVaultLpMint!: PublicKey;
  mercurialVaultLpMintDecimals!: number; // u8
  lpTokenVault!: PublicKey;
  lpTokenVaultBump!: number; // u8
  mintingFeeInBps!: number; // u8
  redeemingFeeInBps!: number; // u8
  totalPaidMintFees!: BN; // u128
  totalPaidRedeemFees!: BN; // u128
}

export enum PnLPolarity {
  Positive = `Positive`,
  Negative = `Negative`,
}

export class MaplePoolDepositoryAccount {
  bump!: number; // u8
  version!: number; // u8
  controller!: PublicKey;
  collateralMint!: PublicKey;
  maplePool!: PublicKey;
  mapleLender!: PublicKey;
  mapleSharesMint!: PublicKey;
  mapleLockedShares!: PublicKey;
  mapleLenderShares!: PublicKey;
  accountingSupplySheet!: AccountingSupplySheetData;
  accountingTotalPaidStampFees!: AccountingTotalPaidStampFeesData;
  accountingBpsStampFees!: AccountingBpsStampFeesData;
}

export class AccountingSupplySheetData {
  supplyCollateralDeposited!: BN; // u128
  supplyRedeemableMinted!: BN; // u128
  supplyRedeemableSoftCap!: BN; // u128
}

export class AccountingTotalPaidStampFeesData {
  totalPaidStampFeeMint!: BN; // u128
  totalPaidStampFeeRedeem!: BN; // u128
}
export class AccountingBpsStampFeesData {
  bpsStampFeeMint!: number; // u8
  bpsStampFeeRedeem!: number; // u8
}
