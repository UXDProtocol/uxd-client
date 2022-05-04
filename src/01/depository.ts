import { BN, Program } from '@project-serum/anchor';
import {
  Cluster,
  ConfirmOptions,
  Connection,
  PublicKey,
} from '@solana/web3.js';
import {
  Num,
  ZERO_ONE_DEVNET_PROGRAM_ID,
  ZERO_ONE_MAINNET_PROGRAM_ID,
  ZO_DEVNET_STATE_KEY,
  ZO_FUTURE_TAKER_FEE,
  ZO_MAINNET_STATE_KEY,
} from '@zero_one/client';
import { findAddrSync } from '../utils';
import { IDL } from '../idl';
import { ZoDepositoryAccount } from '../interfaces';
import { Zo } from '.';

const SLIPPAGE_BASIS = 1000;

export class ZoDepository {
  public pda: PublicKey;
  public zoAccountPda: PublicKey;
  public collateralMint: PublicKey;
  public collateralMintSymbol: string;
  public collateralMintDecimals: number;
  public quoteMint: PublicKey;
  public quoteMintSymbol: string;
  public quoteMintDecimals: number;
  uxdProgramId: PublicKey;

  public constructor(
    mint: PublicKey,
    mintName: string,
    mintDecimals: number,
    quoteMint: PublicKey,
    quoteMintName: string,
    quoteMintDecimals: number,
    uxdProgramId: PublicKey,
    cluster: Cluster
  ) {
    let zoProgramId: PublicKey;
    let zoState: PublicKey;
    switch (cluster) {
      case 'devnet':
        zoProgramId = ZERO_ONE_DEVNET_PROGRAM_ID;
        zoState = ZO_DEVNET_STATE_KEY;
        break;
      case 'mainnet-beta':
        zoProgramId = ZERO_ONE_MAINNET_PROGRAM_ID;
        zoState = ZO_MAINNET_STATE_KEY;
        break;
      default: {
        throw new Error(`Invalid ZeroOne cluster: ${cluster}`);
      }
    }
    this.collateralMint = mint;
    this.collateralMintSymbol = mintName;
    this.collateralMintDecimals = mintDecimals;
    this.quoteMint = quoteMint;
    this.quoteMintSymbol = quoteMintName;
    this.quoteMintDecimals = quoteMintDecimals;
    this.pda = findAddrSync(
      [Buffer.from('ZODEPOSITORY'), mint.toBuffer()],
      uxdProgramId
    )[0];
    // The authority of the ZO account is the PDA of the depository (the depository)
    this.zoAccountPda = findAddrSync(
      [this.pda.toBuffer(), zoState.toBuffer(), Buffer.from('marginv1')],
      zoProgramId
    )[0];
    this.uxdProgramId = uxdProgramId;
  }

  public info() {
    console.groupCollapsed(
      '[Depository debug info - Collateral mint:',
      this.collateralMintSymbol,
      ' - decimals',
      this.collateralMintDecimals,
      ']'
    );
    console.table({
      ['pda']: this.pda.toString(),
      ['collateralMint']: this.collateralMint.toString(),
      ['collateralMintSymbol']: this.collateralMintSymbol.toString(),
      ['collateralMintDecimals']: this.collateralMintDecimals.toString(),
      ['quoteMint']: this.quoteMint.toString(),
      ['quoteMintSymbol']: this.quoteMintSymbol.toString(),
      ['quoteMintDecimals']: this.quoteMintDecimals.toString(),
      ['ZoAccountPda']: this.zoAccountPda.toString(),
    });
    console.groupEnd();
  }

  public async getOnchainAccount(
    connection: Connection,
    options?: ConfirmOptions
  ): Promise<ZoDepositoryAccount> {
    const uxdProgram = new Program(IDL, this.uxdProgramId);

    const ai = await connection.getAccountInfo(this.pda, options?.commitment);
    if (!ai) {
      throw new Error('zoDepository not found');
    }
    return uxdProgram.coder.accounts.decode(
      'zoDepository',
      ai.data
    ) as ZoDepositoryAccount;
  }

  public getPerpPriceNative(zo: Zo): BN {
    return this.getPerpPriceNum(zo).n;
  }

  public getPerpPriceUI(zo: Zo): number {
    return this.getPerpPriceNum(zo).number;
  }

  getPerpPriceNum(zo: Zo): Num {
    const pmi = zo.state.getMarketIndexBySymbol(
      `${this.collateralMintSymbol}-PERP`
    );
    return zo.state.cache.data.marks[pmi].price;
  }

  // The side of the taker (the user)
  // Price returned is expressed in native units - It's the price used by 01 both client and program side
  getLimitPrice(
    slippage: number,
    perpOrderTakerSide: 'short' | 'long',
    zo: Zo
  ): number {
    const perpPrice = this.getPerpPriceNum(zo);
    const slippageRatio = slippage / SLIPPAGE_BASIS;
    const delta = perpPrice.number * slippageRatio;
    switch (perpOrderTakerSide) {
      case 'short': {
        return perpPrice.number - delta;
      }
      case 'long': {
        return perpPrice.number + delta;
      }
    }
  }

  async getZoAccountCollateralOpenOrdersAccountKey(
    zo: Zo,
    controlKey: PublicKey
  ): Promise<PublicKey> {
    const dexMarket = await zo.state.getMarketBySymbol(
      `${this.collateralMintSymbol}-PERP`
    );
    return findAddrSync(
      [controlKey.toBuffer(), dexMarket.address.toBuffer()],
      zo.dexProgramId
    )[0];
  }

  getZoTakerFee(): number {
    return ZO_FUTURE_TAKER_FEE;
  }

  async minTradingSizeBase(zo: Zo): Promise<number> {
    const dexMarket = await zo.state.getMarketBySymbol(
      `${this.collateralMintSymbol}-PERP`
    );
    return dexMarket.minOrderSize;
  }

  public async settleMarginAccountFunds(zo: Zo): Promise<string> {
    const zoAccount = await zo.loadMarginAccount(this.zoAccountPda);
    return zoAccount.settleFunds(`${this.collateralMintSymbol}-PERP`);
  }

  // async minTradingSizeQuote(zo: Zo): Promise<number> {
  //     const dexMarket = await zo.state.getMarketBySymbol(this.collateralMintSymbol + "-PERP");
  //     const tickSize = dexMarket.tickSize;
  // ...
  // }
}
