import { Connection, PublicKey } from '@solana/web3.js';
import { createAndInitializeMango, Mango } from '../mango';
import { MangoDepository } from '../mango/depository';
import { SOL_DECIMALS, USDC, USDC_DECIMALS, WSOL } from '../utils';

describe('Price Impact / Mint/Redeem estimations tests', () => {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const program = new PublicKey('UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr');
  const depository = new MangoDepository(
    WSOL,
    'SOL',
    SOL_DECIMALS,
    USDC,
    'USDC',
    USDC_DECIMALS,
    program
  );
  let mango: Mango;
  let perpPrice: number;

  beforeAll(async () => {
    mango = await createAndInitializeMango(connection, 'mainnet');
    perpPrice = await depository.getCollateralPerpPriceUI(mango);
  });

  it('Minting', async () => {
    // User wants to mint `collateralQuantity` (Collateral -> UXD)
    const collateralQuantity = 5; // 5 Sol
    const mintingPriceImpact = await depository.getMintingPriceImpact(
      collateralQuantity,
      mango
    );
    console.log('Minting price impact', mintingPriceImpact);

    const mintingEstimates = depository.getMintingEstimates(
      collateralQuantity,
      perpPrice,
      mintingPriceImpact,
      mango
    );
    console.log('Will mint', mintingEstimates.yield, 'UXD');
    console.log(
      '(fees:',
      mintingEstimates.fees,
      ', slippage:',
      mintingEstimates.slippage,
      ')'
    );
  });

  it('Redeeming', async () => {
    const redeemableQuantity = 100; // 100 UXD
    const redeemingPriceImpact = await depository.getRedeemingPriceImpact(
      redeemableQuantity,
      perpPrice,
      mango
    );
    console.log('Redeeming price impact', redeemingPriceImpact);

    const redeemingEstimates = depository.getRedeemingEstimates(
      redeemableQuantity,
      perpPrice,
      redeemingPriceImpact,
      mango
    );
    console.log('Will redeem', redeemingEstimates.yield, 'Collateral');
    console.log(
      '(fees:',
      redeemingEstimates.fees,
      ', slippage:',
      redeemingEstimates.slippage,
      ')'
    );
  });
});
