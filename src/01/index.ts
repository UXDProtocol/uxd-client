import { Cluster, Connection, PublicKey } from '@solana/web3.js';
import * as zo from '@zero_one/client';
import {
  ZO_DEVNET_STATE_KEY,
  ZO_DEX_DEVNET_PROGRAM_ID,
  ZO_DEX_MAINNET_PROGRAM_ID,
  ZO_MAINNET_STATE_KEY,
} from '@zero_one/client';
import * as anchorZo from '@zero_one/client/node_modules/@project-serum/anchor';

const invalidClusterError = 'Invalid cluster';

// Helper to init and configure a Zo object.
export async function createAndInitializeZo(
  connection: Connection,
  user: zo.Wallet,
  options: anchorZo.web3.ConfirmOptions,
  cluster: Cluster
): Promise<Zo> {
  let zoState: PublicKey;
  let zoCluster: zo.Cluster;
  let zoDexProgram: PublicKey;

  switch (cluster) {
    case 'devnet':
      zoCluster = zo.Cluster.Devnet;
      zoState = ZO_DEVNET_STATE_KEY;
      zoDexProgram = ZO_DEX_DEVNET_PROGRAM_ID;
      break;
    case 'mainnet-beta':
      zoCluster = zo.Cluster.Mainnet;
      zoState = ZO_MAINNET_STATE_KEY;
      zoDexProgram = ZO_DEX_MAINNET_PROGRAM_ID;
      break;
    default: {
      throw invalidClusterError;
    }
  }

  // Setup the program
  const zoProvider = zo.createProvider(connection, user, options);
  const program = zo.createProgram(zoProvider, zoCluster);

  // Load the state
  const state: zo.State = await zo.State.load(program, zoState);

  return new Zo(program, zoDexProgram, state);
}

export class Zo {
  public program: anchorZo.Program<zo.Zo>;
  public dexProgramId: PublicKey;
  public state: zo.State;

  constructor(
    program: anchorZo.Program<zo.Zo>,
    zoDexProgram: PublicKey,
    state: zo.State
  ) {
    this.program = program;
    this.dexProgramId = zoDexProgram;
    this.state = state;
    // TO investigate, interval
    state.startCacheRefreshCycle();
  }

  public async loadMarginAccount(owner: PublicKey): Promise<zo.Margin> {
    return await zo.Margin.load(
      this.program,
      this.state,
      this.state.cache,
      owner
    );
  }

  // public async getDexMarket(collateralSymbol: string): Promise<zo.ZoMarket> {
  //     return this.state.getMarketBySymbol(collateralSymbol + "-PERP");
  // }
}
