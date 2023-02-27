import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';
import {
  PublicKey,
  Connection,
  Commitment,
  TransactionInstruction,
} from '@solana/web3.js';

import BN from 'bn.js';

// Constants
export const BTC_DECIMALS = 6;
export const SOL_DECIMALS = 9;
export const ETH_DECIMALS = 6;
export const USDC_DECIMALS = 6;
export const UXD_DECIMALS = 6;

export const UXD = new PublicKey(
  '7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT'
);
export const WSOL = new PublicKey(
  'So11111111111111111111111111111111111111112'
);
export const USDC = new PublicKey(
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
);
export const BTC = new PublicKey(
  '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'
);
export const ETH = new PublicKey(
  '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk'
);

export const UXD_DEVNET = new PublicKey(
  'GhFRARKh28888Cn6LkHu11L38pgf84TaeaVFJfuTPFUH'
); // with Devnet ProgId 5rYjdoWQcbGSes3G4frkLA6oLxFmtUagn8xc1fvSATYL
export const WSOL_DEVNET = WSOL;
export const USDC_DEVNET = new PublicKey(
  '8FRFC6MoGGkMFQwngccyu69VnYbzykGeez7ignHVAFSN'
);
export const BTC_DEVNET = new PublicKey(
  '3UNBZ6o52WTWwjac2kPUb4FyodhU1vFkRJheu1Sh2TvU'
);
export const ETH_DEVNET = new PublicKey(
  'Cu84KB3tDL6SbFgToHMLYVDJJXdJjenNzSKikeAvzmkA'
);

// returns an instruction to create the associated account for a wallet and mint
export function createAssocTokenIx(
  wallet: PublicKey,
  account: PublicKey,
  mint: PublicKey
): TransactionInstruction {
  return createAssociatedTokenAccountInstruction(
    wallet, // payer
    account, // associatedToken
    wallet, // owner
    mint // mint
  );
}

const TOKEN_PROGRAM_ID_BUFFER = TOKEN_PROGRAM_ID.toBuffer();

export function findATAAddrSync(
  wallet: PublicKey,
  mintAddress: PublicKey
): [PublicKey, number] {
  const seeds = [
    wallet.toBuffer(),
    TOKEN_PROGRAM_ID_BUFFER,
    mintAddress.toBuffer(),
  ];
  return PublicKey.findProgramAddressSync(seeds, ASSOCIATED_TOKEN_PROGRAM_ID);
}

export function findMultipleATAAddSync(
  wallet: PublicKey,
  mintAddresses: PublicKey[]
) {
  const walletBuffer = wallet.toBuffer();
  return mintAddresses.map((mintAddress) => {
    const seeds = [
      walletBuffer,
      TOKEN_PROGRAM_ID_BUFFER,
      mintAddress.toBuffer(),
    ];
    return PublicKey.findProgramAddressSync(seeds, ASSOCIATED_TOKEN_PROGRAM_ID);
  });
}

export async function getBalance(
  connection: Connection,
  tokenAccount: PublicKey,
  commitment?: Commitment
): Promise<number> {
  const res = await connection.getTokenAccountBalance(tokenAccount, commitment);
  const value = res['value']['uiAmount'];
  if (!value) {
    throw new Error('Unable to retrieve token account balance');
  }
  return value;
}

export function uiToNative(uiAmount: number, decimals: number): BN {
  return new BN(Math.round(uiAmount * Math.pow(10, decimals)));
}

export function nativeToUi(nativeAmount: BN, decimals: number): number {
  return +nativeAmount / Math.pow(10, decimals);
}
