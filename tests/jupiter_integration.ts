import JSBI from 'jsbi';
import { Connection, PublicKey } from '@solana/web3.js'
import { NATIVE_MINT } from "@solana/spl-token";
import { Config, IDS, getPerpMarketByBaseSymbol, MangoClient } from '@blockworks-foundation/mango-client';
import { expect } from "chai";
import { UxdMangoDepositoryMarket } from '../src/jupiter/UxdMangoDepositoryMarket';
import { UXD, WSOL } from '../src';
import { SwapMode } from '../src/jupiter/types';

const RPC = "https://ssc-dao.genesysgo.net";

// // Get Mango groupConfigPDA
// MANGO_PROGRAM_ID_MAINNET
// let mangoConfig = new Config(IDS);
// let mangoCluster = 'mainnet';
// let mangoGroupName = MANGO_MAINNET_GROUP_ONE;
// const groupConfig = mangoConfig.getGroup(mangoCluster, mangoGroupName);
// if (!groupConfig) {
//     throw new Error('unable to get mango group config');
// }
// const clusterData = IDS.groups.find(
//     (g: { name: string; cluster: string }) => {
//         return g.name === params.mangoGroupName && g.cluster === params.mangoCluster;
//     }
// );
// if (!clusterData) {
//     throw new Error('cluster data not found');

// }
// this.mangoGroupPda = groupConfig.publicKey;

// let quoteToken = getTokenBySymbol(groupConfig, groupConfig.quoteSymbol);
// if (!quoteToken) {
//     throw new Error('quoteToken not found');
// }
// let collateralToken = getTokenByMint(groupConfig, params.collateralMint);
// if (!collateralToken) {
//     throw new Error('collateralToken not found');
// }

// // Get perpMarketPDA

// let perpMarketConfig = getPerpMarketByBaseSymbol(groupConfig, collateralToken.symbol);
// if (!perpMarketConfig) {
//     throw new Error('perpMarket not found');
// }

describe("Jupiter integration test", () => {
    it("Show price", async () => {
        console.log(`-> Initialize the connection with the RPC ${RPC} ...`);

        const connection = new Connection(RPC, 'processed');

        const solMangoDepositoryPda = new PublicKey('FHUaC5eXkbSFAmDk4jTsReX9XAKEtDfu34uTpMMUipmp');

        const solMangoDepositoryAccountInfo = await connection.getAccountInfo(solMangoDepositoryPda);

        if (!solMangoDepositoryAccountInfo) {
            throw new Error('cannot load sol mango depository account info');
        }

        const MANGO_MAINNET_GROUP_ONE = 'mainnet.1';
        const MANGO_PROGRAM_ID_MAINNET = new PublicKey('mv3ekLzLbnVPNxjSKvqBpU3ZeZXPQdEC3bp5MDEBG68');

        const mangoConfig = new Config(IDS);
        const mangoCluster = 'mainnet';
        const mangoGroupName = MANGO_MAINNET_GROUP_ONE;
        const groupConfig = mangoConfig.getGroup(mangoCluster, mangoGroupName);
        if (!groupConfig) {
            throw new Error('unable to get mango group config');
        }
        const mangoGroupPda = groupConfig.publicKey;

        const perpMarketConfig = getPerpMarketByBaseSymbol(groupConfig, 'SOL');
        if (!perpMarketConfig) {
            throw new Error('perpMarket not found');
        }

        const client = new MangoClient(connection, MANGO_PROGRAM_ID_MAINNET);

        const mangoGroup = await client.getMangoGroup(mangoGroupPda);

        const uxdMangoDepositoryMarket = new UxdMangoDepositoryMarket(solMangoDepositoryPda, solMangoDepositoryAccountInfo, {
            collateralMint: NATIVE_MINT,
            uxdProgramId: new PublicKey('UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr'),
            mangoCachePda: mangoGroup.mangoCache,
            mangoGroupPda,
            mangoPerpMarketPda: perpMarketConfig.publicKey,
            mangoPerpMarketAsksPda: perpMarketConfig.asksKey,
            mangoPerpMarketBidsPda: perpMarketConfig.bidsKey,
            mangoPerpMarketIndex: perpMarketConfig.marketIndex,
        });

        const accountsToLoad = uxdMangoDepositoryMarket.getAccountsForUpdate();

        const accountsInfo = await Promise.all(accountsToLoad.map(address => connection.getAccountInfo(address)));

        const accountsInfoMap = new Map();

        accountsInfo.forEach((accountInfo, index) => {
            accountsInfoMap.set(accountsToLoad[index].toBase58(), accountInfo);
        });

        uxdMangoDepositoryMarket.update(accountsInfoMap);

        const quote = uxdMangoDepositoryMarket.getQuote({
            sourceMint: WSOL,
            destinationMint: UXD,
            amount: JSBI.BigInt(1_000_000),
            swapMode: SwapMode.ExactIn,
        });

        expect(true).equals(true);

        console.log('Quote', {
            notEnoughLiquidity: quote.notEnoughLiquidity,
            inAmount: quote.inAmount.toString(),
            outAmount: quote.outAmount.toString(),
            feeAmount: quote.feeAmount.toString(),
            feeMint: quote.feeMint,
            feePct: quote.feePct,
            priceImpactPct: quote.priceImpactPct,
        });

        /*
        console.log(`-> Load jupiter client ...`);
    
        const jupiter = await Jupiter.load({
            connection,
            cluster: 'mainnet-beta',
            user: wallet.publicKey,
            routeCacheDuration: 10_000, // Will not refetch data on computeRoutes for up to 10 seconds
        });
    
        const [uxdATA] = findATAAddrSync(wallet.publicKey, UXD);
        const [btcATA] = findATAAddrSync(wallet.publicKey, BTC);
        const [usdcATA] = findATAAddrSync(wallet.publicKey, USDC);
    
        const routes = await jupiter.computeRoutes({
            inputMint: WRAPPED_SOL_MINT, // Mint address of the input token
            outputMint: UXD, // Mint address of the output token
            amount: JSBI.BigInt(1), // raw input amount of tokens
            slippage: 1, // The slippage in % terms
            forceFetch: true, // false is the default value => will use cache if not older than routeCacheDuration
            onlyDirectRoutes: true,
        });
    
        console.log('routes', JSON.stringify(routes, null, 5));*/

        // ...
    });
});