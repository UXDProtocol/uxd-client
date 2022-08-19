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
  vTokenMint!: PublicKey;
  vTokenDecimals!: number; //u8
  vTokensVault!: PublicKey;
  vTokensVaultBump!: number; //u8
}

export enum PnLPolarity {
  Positive = `Positive`,
  Negative = `Negative`,
}
