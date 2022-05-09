import { Cluster, Connection, PublicKey } from '@solana/web3.js';
import {
  ZO_DEVNET_STATE_KEY,
  ZO_DEX_DEVNET_PROGRAM_ID,
  ZO_DEX_MAINNET_PROGRAM_ID,
  ZO_MAINNET_STATE_KEY,
  Wallet as zoWallet,
  Cluster as zoCluster,
  createProvider as zoCreateProvider,
  createProgram as zoCreateProgram,
  State as zoState,
  Margin as zoMargin,
  Zo as ZoIdl,
} from '@zero_one/client';
import * as anchorZo from '@zero_one/client/node_modules/@project-serum/anchor';

const invalidClusterError = 'Invalid cluster';

// Helper to init and configure a Zo object.
export async function createAndInitializeZo(
  connection: Connection,
  user: zoWallet,
  options: anchorZo.web3.ConfirmOptions,
  cluster: Cluster
): Promise<Zo> {
  let stateZo: PublicKey;
  let clusterZo: zoCluster;
  let zoDexProgram: PublicKey;

  switch (cluster) {
    case 'devnet':
      clusterZo = zoCluster.Devnet;
      stateZo = ZO_DEVNET_STATE_KEY;
      zoDexProgram = ZO_DEX_DEVNET_PROGRAM_ID;
      break;
    case 'mainnet-beta':
      clusterZo = zoCluster.Mainnet;
      stateZo = ZO_MAINNET_STATE_KEY;
      zoDexProgram = ZO_DEX_MAINNET_PROGRAM_ID;
      break;
    default: {
      throw invalidClusterError;
    }
  }

  // Setup the program
  const zoProvider = zoCreateProvider(connection, user, options);
  const program = zoCreateProgram(zoProvider, clusterZo);

  // Load the state
  const state: zoState = await zoState.load(program, stateZo);

  return new Zo(program, zoDexProgram, state);
}

export class Zo {
  public program: anchorZo.Program<ZoIdl>;
  public dexProgramId: PublicKey;
  public state: zoState;

  constructor(
    program: anchorZo.Program<ZoIdl>,
    zoDexProgram: PublicKey,
    state: zoState
  ) {
    this.program = program;
    this.dexProgramId = zoDexProgram;
    this.state = state;
    // TO investigate, interval
    state.startCacheRefreshCycle();
  }

  public async loadMarginAccount(owner: PublicKey): Promise<zoMargin> {
    return await zoMargin.load(
      this.program,
      this.state,
      this.state.cache,
      owner
    );
  }
}
