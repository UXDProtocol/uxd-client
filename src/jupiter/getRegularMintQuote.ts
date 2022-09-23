
import JSBI from "jsbi";
import { BN, BookSide, I80F48, MangoCache, MangoGroup, uiToNative, } from '@blockworks-foundation/mango-client';
import { PublicKey } from '@solana/web3.js';
import type { Quote } from "./types";
import * as utils from "./utils";

// Estimated amount of Redeemable (UXD) that will be given for Minting (Mint or RebalancingLite when PnlPolarity is positive)
// `collateralQuantity` : In Collateral UI units
//  Output -> breakdown of estimated costs
export default function getRegularMintQuote({
    collateralAmount,
    bids,
    mangoGroup,
    mangoCache,
    mangoPerpMarketIndex,
    mangoPerpMarketPda,
    feeMint,
}: {
    collateralAmount: BN;
    bids: BookSide;
    mangoGroup: MangoGroup;
    mangoCache: MangoCache;
    mangoPerpMarketIndex: number;
    mangoPerpMarketPda: PublicKey;
    feeMint: PublicKey;
}): Quote {
    // Current mid price (without any order quantity consideration)
    const midPrice = utils.getPerpPrice({
        mangoGroup,
        mangoCache,
        mangoPerpMarketPda,
    });

    // Order execution reached price, how much this order will move the price
    let executionPrice: I80F48;

    try {
        executionPrice = utils.calculatePerpOrderPriceImpact({
            amount: collateralAmount,
            bookSide: bids,
        });
    } catch {
        return {
            notEnoughLiquidity: true,
            inAmount: JSBI.BigInt(collateralAmount.toString()),
            outAmount: JSBI.BigInt(0),
            feeAmount: JSBI.BigInt(0),
            feeMint: feeMint.toBase58(),
            feePct: 0,
            priceImpactPct: 0,
        };
    };

    const midToExecutionPriceDelta = executionPrice.sub(midPrice);

    const priceImpactPercentage = midToExecutionPriceDelta.div(midPrice);

    // We calculate a worse case out amount, that isn't super precise, because the execution price is just the highest reached, not the average
    const executionSizeEstimate = I80F48.fromString(collateralAmount.toString()).mul(executionPrice);

    const feeAmount = utils.calculatePerpOrderFees({
        amount: executionSizeEstimate,
        mangoGroup,
        mangoPerpMarketIndex,
    });

    const feePercentage = feeAmount.div(I80F48.fromString(collateralAmount.toString()));

    const outAmountEstimate = executionSizeEstimate.sub(feeAmount);

    return {
        notEnoughLiquidity: false,
        inAmount: JSBI.BigInt(collateralAmount.toString()),
        outAmount: JSBI.BigInt(outAmountEstimate.floor().toString()),
        feeAmount: JSBI.BigInt(feeAmount.ceil().toString()),
        feeMint: feeMint.toBase58(),
        feePct: feePercentage.toNumber(),
        priceImpactPct: priceImpactPercentage.toNumber(),
    }
}