import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
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
  return Token.createAssociatedTokenAccountInstruction(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mint,
    account,
    wallet, // owner
    wallet // payer
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
  const uiAmountString = uiAmount.toString(10).toLowerCase();
  let exponentPosition = uiAmountString.indexOf("e");
  if (exponentPosition == -1) {
    exponentPosition = uiAmountString.length;
  }
  let pointPosition = uiAmountString.indexOf('.');
  if (pointPosition == -1) {
    pointPosition = exponentPosition;
  }
  const integerPartString = uiAmountString.substring(0, pointPosition);
  const floatingPartString = uiAmountString.substring(pointPosition, exponentPosition);
  const exponentPartString = uiAmountString.substring(exponentPosition + 1);
  const nativePartString = floatingPartString
    .substring(1, decimals + 1)
    .padEnd(decimals, '0');
  const nativeAmount = new BN(integerPartString + nativePartString);
  if (exponentPartString.length == 0) {
    return nativeAmount;
  }
  const nativeExponent = new BN(parseInt(exponentPartString, 10));
  const nativeMagnitude = new BN(10).pow(nativeExponent);
  return nativeAmount.mul(nativeMagnitude);
}

export function nativeToUi(nativeAmount: BN, decimals: number): number {
  const nativeAmountString = nativeAmount.toString(10, decimals + 1);
  const pointPosition = nativeAmountString.length - decimals;
  const integerPartString = nativeAmountString.substring(0, pointPosition);
  const nativePartString = nativeAmountString.substring(pointPosition);
  const floatingPartString = "." + nativePartString;
  return parseFloat(integerPartString + floatingPartString);
}
