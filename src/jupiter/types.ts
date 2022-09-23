import { AccountInfo, PublicKey } from "@solana/web3.js";
import JSBI from 'jsbi';

export type AccountInfoMap = Map<string, AccountInfo<Buffer> | null>;

// =========================================================================

// Every types below are copy/pasted from @jup-ag/core documentation
// /!\ You cannot modify them
export type TokenMintAddress = string;
export enum SwapMode {
    ExactIn = "ExactIn",
    ExactOut = "ExactOut",
}

export interface Amm {
    reserveTokenMints: PublicKey[];
    getAccountsForUpdate(): PublicKey[];
    update(accountInfoMap: AccountInfoMap): void;
    getQuote(quoteParams: QuoteParams): Quote;
}

export interface QuoteParams {
    sourceMint: PublicKey;
    destinationMint: PublicKey;
    amount: JSBI;
    swapMode: SwapMode;
}

export interface Quote {
    notEnoughLiquidity: boolean;
    inAmount: JSBI;
    outAmount: JSBI;
    feeAmount: JSBI;
    feeMint: TokenMintAddress;
    feePct: number;
    priceImpactPct: number;
}

export interface SwapParams {
    sourceMint: PublicKey;
    destinationMint: PublicKey;
    userSourceTokenAccount: PublicKey;
    userDestinationTokenAccount: PublicKey;
    userTransferAuthority: PublicKey;
    inAmount: JSBI;
}

export interface UxdMangoDepositoryMarketParams {
    uxdProgramId: PublicKey;
    collateralMint: PublicKey;
    mangoGroupPda: PublicKey;
    mangoCachePda: PublicKey;
    mangoPerpMarketPda: PublicKey;
    mangoPerpMarketAsksPda: PublicKey;
    mangoPerpMarketBidsPda: PublicKey;
    mangoPerpMarketIndex: number;
}

// =========================================================================