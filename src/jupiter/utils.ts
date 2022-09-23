import { BN, BookSide, I80F48, MangoCache, MangoGroup, } from '@blockworks-foundation/mango-client';
import { PublicKey } from '@solana/web3.js';

// Return the price impact of a base amount order for a given bookside
export function calculatePerpOrderPriceImpact({
    amount,
    bookSide,
}: {
    amount: BN;
    bookSide: BookSide;
}): I80F48 {
    const uiPriceImpact = bookSide.getImpactPriceUi(amount);

    if (typeof uiPriceImpact === 'undefined') {
        throw new Error("Price impact couldn't be determined.");
    }

    return I80F48.fromNumber(uiPriceImpact);
}

export function calculatePerpOrderFees({
    amount,
    mangoGroup,
    mangoPerpMarketIndex,
}: {
    amount: I80F48;
    mangoGroup: MangoGroup;
    mangoPerpMarketIndex: number;
}): I80F48 {
    const takerFeeRate = mangoGroup.perpMarkets[mangoPerpMarketIndex].takerFee;

    return amount.mul(takerFeeRate);
}

export function getPerpPrice({
    mangoGroup,
    mangoCache,
    mangoPerpMarketPda,
}: {
    mangoGroup: MangoGroup;
    mangoCache: MangoCache;
    mangoPerpMarketPda: PublicKey;
}): I80F48 {
    const perpMarketIndex = mangoGroup.getPerpMarketIndex(mangoPerpMarketPda);

    return mangoGroup.getPrice(perpMarketIndex, mangoCache);
}