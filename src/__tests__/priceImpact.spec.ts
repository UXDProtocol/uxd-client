import { PublicKey } from "@solana/web3.js";
import { createAndInitializeMango } from "../mango";
import { MangoDepository } from "../mango/depository";
import { SOL_DECIMALS, USDC, USDC_DECIMALS, WSOL } from "../utils";
import { Connection } from '@solana/web3.js';

describe("Price Impact / Mint/Redeem estimations tests", async () => {

    const mainnetProgramId = new PublicKey('UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr');
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const mango = await createAndInitializeMango(
        connection,
        'mainnet' // 'devnet'
    );
    const depository = new MangoDepository(
        WSOL,
        'SOL',
        SOL_DECIMALS,
        USDC, // Use mainnet mint, must be matching the program used (see USDC_DEVNET)
        'USDC',
        USDC_DECIMALS,
        mainnetProgramId // Mainnet program
    );

    const perpPrice = await depository.getCollateralPerpPriceUI(mango);


    it("Minting", async () => {
        // User wants to mint `collateralQuantity` (Collateral -> UXD)
        const collateralQuantity = 5; // 5 Sol
        const mintingPriceImpact = await depository.getMintingPriceImpact(
            collateralQuantity,
            mango
        );
        console.log("Minting price impact", mintingPriceImpact);

        const mintingEstimates = depository.getMintingEstimates(
            collateralQuantity,
            perpPrice,
            mintingPriceImpact,
            mango,
        );
        console.log("Will mint", mintingEstimates.yield, "UXD");
        console.log("(fees:", mintingEstimates.fees, ", slippage:", mintingEstimates.slippage, ")");
    });

    it("Redeeming", async () => {
        const redeemableQuantity = 100; // 100 UXD
        const redeemingPriceImpact = await depository.getRedeemingPriceImpact(
            redeemableQuantity,
            perpPrice,
            mango
        );
        console.log("Redeeming price impact", redeemingPriceImpact);

        const redeemingEstimates = depository.getRedeemingEstimates(
            redeemableQuantity,
            perpPrice,
            redeemingPriceImpact,
            mango,
        );
        console.log("Will redeem", redeemingEstimates.yield, "Collateral");
        console.log("(fees:", redeemingEstimates.fees, ", slippage:", redeemingEstimates.slippage, ")");

    });
});