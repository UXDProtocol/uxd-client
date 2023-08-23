import {
  BorshAccountsCoder,
  Wallet,
  AnchorProvider,
  Program,
  BN,
} from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey } from '@solana/web3.js';
import { IDL } from '../idl';
import { CredixLpDepositoryAccount } from '../interfaces';
import { getMint } from '@solana/spl-token';
import { findATAAddrSync } from '../utils';
import { IDL as credixIDL, Credix as CredixIDL } from './credixIdl';

const CREDIX_LP_DEPOSITORY_NAMESPACE = 'CREDIX_LP_DEPOSITORY';

const CREDIX_LP_INTERNAL_CREDIX_MARKETPLACE_NAMESPACE = 'credix-marketplace';
const CREDIX_LP_INTERNAL_CREDIX_PASS_NAMESPACE = 'credix-pass';
const CREDIX_LP_INTERNAL_PROGRAM_STATE_NAMESPACE = 'program-state';

const CREDIX_LP_INTERNAL_WITHDRAW_EPOCH_NAMESPACE = 'withdraw-epoch';
const CREDIX_LP_INTERNAL_WITHDRAW_REQUEST_NAMESPACE = 'withdraw-request';

export class CredixLpDepository {
  public constructor(
    public readonly pda: PublicKey,
    public readonly collateralMint: PublicKey,
    public readonly collateralDecimals: number,
    public readonly collateralSymbol: string,
    public readonly depositoryCollateral: PublicKey,
    public readonly depositoryShares: PublicKey,
    public readonly credixProgramState: PublicKey,
    public readonly credixGlobalMarketState: PublicKey,
    public readonly credixSigningAuthority: PublicKey,
    public readonly credixLiquidityCollateral: PublicKey,
    public readonly credixSharesMint: PublicKey,
    public readonly credixPass: PublicKey,
    public readonly credixTreasuryCollateral: PublicKey,
    public readonly credixMultisigKey: PublicKey,
    public readonly credixMultisigCollateral: PublicKey,
    public readonly credixWithdrawEpoch: PublicKey,
    public readonly credixWithdrawRequest: PublicKey,
    public readonly credixProgramId: PublicKey,
    public readonly credixPoolOutstandingCredit: BN,
    public readonly credixReleaseTimestamp: BN
  ) {}

  public static async initialize({
    connection,
    uxdProgramId,
    collateralMint,
    collateralSymbol,
    credixProgramId,
  }: {
    connection: Connection;
    uxdProgramId: PublicKey;
    collateralMint: PublicKey;
    collateralSymbol: string;
    credixProgramId: PublicKey;
  }): Promise<CredixLpDepository> {
    // Collateral decimals can be resolved asynchronously
    const collateralDecimalsPromise = this.getCollateralDecimals(
      connection,
      collateralMint
    );

    // First we need to resolve the basic credix accounts address
    const credixGlobalMarketState =
      this.findCredixGlobalMarketStateAddress(credixProgramId);
    const credixProgramState =
      this.findCredixProgramStateAddress(credixProgramId);

    // Then derive credix internal accounts that depends on the above
    const credixSigningAuthority = this.findCredixSigningAuthorityAddress(
      credixGlobalMarketState,
      credixProgramId
    );
    const credixLiquidityCollateral = this.findCredixLiquidityCollateralAddress(
      credixSigningAuthority,
      collateralMint
    );

    // Then we can find the depository address
    const depository = this.findDepositoryAddress(
      credixGlobalMarketState,
      collateralMint,
      uxdProgramId
    );
    // Then the credix pass which depends on the depository
    const credixPass = this.findCredixPassAddress(
      credixGlobalMarketState,
      depository,
      credixProgramId
    );

    // Then we can read the content of all credix accounts on chain
    const credixProgram = this.getCredixProgram(connection, credixProgramId);
    const credixGlobalMarketStateAccountPromise =
      this.getCredixGlobalMarketStateAccount(
        credixProgram,
        credixGlobalMarketState
      );
    const credixProgramStateAccountPromise = this.getCredixProgramStateAccount(
      credixProgram,
      credixProgramState
    );
    const credixPassAccountPromise = this.getCredixPassAccount(
      credixProgram,
      credixPass
    );

    // Wait until we have all the accounts deserialized data before progressing further
    const credixGlobalMarketStateAccount =
      await credixGlobalMarketStateAccountPromise;
    const credixProgramStateAccount = await credixProgramStateAccountPromise;
    const credixPassAccount = await credixPassAccountPromise;

    // Then we can read all the informations needed from the onchain accounts
    const credixSharesMint = credixGlobalMarketStateAccount.lpTokenMint;
    const credixTreasuryCollateral =
      credixGlobalMarketStateAccount.treasuryPoolTokenAccount;

    const credixMultisigKey = credixProgramStateAccount.credixMultisigKey;
    const credixMultisigCollateral = this.findCredixMultisigCollateralAddress(
      credixMultisigKey,
      collateralMint
    );

    const credixLatestWithdrawEpochIdx =
      credixGlobalMarketStateAccount.latestWithdrawEpochIdx;
    const credixPoolOutstandingCredit =
      credixGlobalMarketStateAccount.poolOutstandingCredit;
    const credixReleaseTimestamp = credixPassAccount.releaseTimestamp;

    // Then generate the depository token accounts
    const depositoryCollateral = this.findDepositoryCollateralAddress(
      depository,
      collateralMint
    );
    const depositoryShares = this.findDepositorySharesAddress(
      depository,
      credixSharesMint
    );

    // Resolve withdraw epochs
    const credixWithdrawEpoch = this.findCredixWithdrawEpochAddress(
      credixGlobalMarketState,
      credixLatestWithdrawEpochIdx,
      credixProgramId
    );
    const credixWithdrawRequest = this.findCredixWithdrawRequestAddress(
      depository,
      credixGlobalMarketState,
      credixLatestWithdrawEpochIdx,
      credixProgramId
    );

    // Resolve final informations when all scheduled work is done
    const collateralDecimals = await collateralDecimalsPromise;

    // Done
    return new CredixLpDepository(
      depository,
      collateralMint,
      collateralDecimals,
      collateralSymbol,
      depositoryCollateral,
      depositoryShares,
      credixProgramState,
      credixGlobalMarketState,
      credixSigningAuthority,
      credixLiquidityCollateral,
      credixSharesMint,
      credixPass,
      credixTreasuryCollateral,
      credixMultisigKey,
      credixMultisigCollateral,
      credixWithdrawEpoch,
      credixWithdrawRequest,
      credixProgramId,
      credixPoolOutstandingCredit,
      credixReleaseTimestamp
    );
  }

  private static findDepositoryAddress(
    credixGlobalMarketState: PublicKey,
    collateralMint: PublicKey,
    uxdProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from(CREDIX_LP_DEPOSITORY_NAMESPACE),
        credixGlobalMarketState.toBuffer(),
        collateralMint.toBuffer(),
      ],
      uxdProgramId
    )[0];
  }

  private static findDepositoryCollateralAddress(
    depository: PublicKey,
    collateralMint: PublicKey
  ): PublicKey {
    return findATAAddrSync(depository, collateralMint)[0];
  }

  private static findDepositorySharesAddress(
    depository: PublicKey,
    credixSharesMint: PublicKey
  ): PublicKey {
    return findATAAddrSync(depository, credixSharesMint)[0];
  }

  private static findCredixProgramStateAddress(
    credixProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(CREDIX_LP_INTERNAL_PROGRAM_STATE_NAMESPACE)],
      credixProgramId
    )[0];
  }

  private static findCredixGlobalMarketStateAddress(
    credixProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(CREDIX_LP_INTERNAL_CREDIX_MARKETPLACE_NAMESPACE)],
      credixProgramId
    )[0];
  }

  private static findCredixSigningAuthorityAddress(
    credixGlobalMarketState: PublicKey,
    credixProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [credixGlobalMarketState.toBuffer()],
      credixProgramId
    )[0];
  }

  private static findCredixLiquidityCollateralAddress(
    credixSigningAuthority: PublicKey,
    collateralMint: PublicKey
  ): PublicKey {
    return findATAAddrSync(credixSigningAuthority, collateralMint)[0];
  }

  private static findCredixPassAddress(
    credixGlobalMarketState: PublicKey,
    depository: PublicKey,
    credixProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [
        credixGlobalMarketState.toBuffer(),
        depository.toBuffer(),
        Buffer.from(CREDIX_LP_INTERNAL_CREDIX_PASS_NAMESPACE),
      ],
      credixProgramId
    )[0];
  }

  private static findCredixMultisigCollateralAddress(
    credixMultisigKey: PublicKey,
    collateralMint: PublicKey
  ): PublicKey {
    return findATAAddrSync(credixMultisigKey, collateralMint)[0];
  }

  private static findCredixWithdrawEpochAddress(
    credixGlobalMarketState: PublicKey,
    credixLatestWithdrawEpochIdx: number,
    credixProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [
        credixGlobalMarketState.toBuffer(),
        CredixLpDepository.getBufferFromLeNumber(credixLatestWithdrawEpochIdx),
        Buffer.from(CREDIX_LP_INTERNAL_WITHDRAW_EPOCH_NAMESPACE),
      ],
      credixProgramId
    )[0];
  }

  private static findCredixWithdrawRequestAddress(
    depository: PublicKey,
    credixGlobalMarketState: PublicKey,
    credixLatestWithdrawEpochIdx: number,
    credixProgramId: PublicKey
  ) {
    return PublicKey.findProgramAddressSync(
      [
        credixGlobalMarketState.toBuffer(),
        depository.toBuffer(),
        CredixLpDepository.getBufferFromLeNumber(credixLatestWithdrawEpochIdx),
        Buffer.from(CREDIX_LP_INTERNAL_WITHDRAW_REQUEST_NAMESPACE),
      ],
      credixProgramId
    )[0];
  }

  private static getBufferFromLeNumber(value: number): Buffer {
    const buffer = Buffer.alloc(4);
    buffer.writeInt32LE(value);
    return buffer;
  }

  public static getCredixProgram(
    connection: Connection,
    credixProgramId: PublicKey
  ): Program<CredixIDL> {
    const provider = new AnchorProvider(
      connection,
      {} as Wallet,
      AnchorProvider.defaultOptions()
    );
    return new Program<CredixIDL>(credixIDL, credixProgramId, provider);
  }

  public static async getCredixGlobalMarketStateAccount(
    credixProgram: Program<CredixIDL>,
    credixGlobalMarketState: PublicKey
  ) {
    const credixGlobalMarketStateAccount =
      await credixProgram.account.globalMarketState.fetchNullable(
        credixGlobalMarketState
      );
    if (!credixGlobalMarketStateAccount) {
      throw new Error(
        'Could not read credixGlobalMarketState account:' +
          credixGlobalMarketState.toString()
      );
    }
    return credixGlobalMarketStateAccount;
  }

  public static async getCredixProgramStateAccount(
    credixProgram: Program<CredixIDL>,
    credixProgramState: PublicKey
  ) {
    const credixProgramStateAccount =
      await credixProgram.account.programState.fetchNullable(
        credixProgramState
      );
    if (!credixProgramStateAccount) {
      throw new Error(
        'Could not read credixProgramState account:' +
          credixProgramState.toString()
      );
    }
    return credixProgramStateAccount;
  }

  public static async getCredixPassAccount(
    credixProgram: Program<CredixIDL>,
    credixPass: PublicKey
  ) {
    const credixPassAccount =
      await credixProgram.account.credixPass.fetchNullable(credixPass);
    if (!credixPassAccount) {
      throw new Error(
        'Could not read credixPass account:' + credixPass.toString()
      );
    }
    return credixPassAccount;
  }

  public static async getCredixWithdrawEpochAccount(
    credixProgram: Program<CredixIDL>,
    credixWithdrawEpoch: PublicKey
  ) {
    const credixWithdrawEpochAccount =
      await credixProgram.account.withdrawEpoch.fetchNullable(
        credixWithdrawEpoch
      );
    if (!credixWithdrawEpochAccount) {
      throw new Error(
        'Could not read credixWithdrawEpoch account:' +
          credixWithdrawEpoch.toString()
      );
    }
    return credixWithdrawEpochAccount;
  }

  public static async getCredixWithdrawRequestAccount(
    credixProgram: Program<CredixIDL>,
    credixWithdrawRequest: PublicKey
  ) {
    const credixWithdrawRequestAccount =
      await credixProgram.account.withdrawRequest.fetchNullable(
        credixWithdrawRequest
      );
    if (!credixWithdrawRequestAccount) {
      throw new Error(
        'Could not read credixWithdrawRequest account:' +
          credixWithdrawRequest.toString()
      );
    }
    return credixWithdrawRequestAccount;
  }

  public static async getCollateralDecimals(
    connection: Connection,
    collateralMint: PublicKey
  ): Promise<number> {
    const collateralMintData = await getMint(connection, collateralMint);
    if (!collateralMintData) {
      throw new Error(
        'Could not read collateralMint account:' + collateralMint.toString()
      );
    }
    return collateralMintData.decimals;
  }

  public info() {
    console.groupCollapsed('[Credix Lp Depository debug info]');
    console.table({
      pda: this.pda.toBase58(),
      collateralMint: this.collateralMint.toBase58(),
      collateralDecimals: this.collateralDecimals,
      collateralSymbol: this.collateralSymbol,
      depositoryCollateral: this.depositoryCollateral.toBase58(),
      depositoryShares: this.depositoryShares.toBase58(),
      credixProgramState: this.credixProgramState.toBase58(),
      credixGlobalMarketState: this.credixGlobalMarketState.toBase58(),
      credixSigningAuthority: this.credixSigningAuthority.toBase58(),
      credixLiquidityCollateral: this.credixLiquidityCollateral.toBase58(),
      credixSharesMint: this.credixSharesMint.toBase58(),
      credixPass: this.credixPass.toBase58(),
      credixTreasuryCollateral: this.credixTreasuryCollateral.toBase58(),
      credixMultisigKey: this.credixMultisigKey.toBase58(),
      credixMultisigCollateral: this.credixMultisigCollateral.toBase58(),
      credixProgramId: this.credixProgramId.toBase58(),
    });
    console.groupEnd();
  }

  public async getOnchainAccount(
    connection: Connection,
    options: ConfirmOptions
  ): Promise<CredixLpDepositoryAccount> {
    const coder = new BorshAccountsCoder(IDL);
    const result = await connection.getAccountInfo(
      this.pda,
      options.commitment
    );
    if (!result) {
      throw new Error('credixLpDepository not found');
    }
    return coder.decode('credixLpDepository', result.data);
  }
}
