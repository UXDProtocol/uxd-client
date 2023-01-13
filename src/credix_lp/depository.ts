import {
  BorshAccountsCoder,
  Wallet,
  AnchorProvider,
  Program,
  BN,
} from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey, Signer } from '@solana/web3.js';
import { IDL, Uxd } from '../idl';
import { CredixLpDepositoryAccount } from '../interfaces';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { findATAAddrSync } from '../utils';
import { IDL as credixIDL, Credix as CredixIDL } from './credixIdl';

const CREDIX_LP_DEPOSITORY_NAMESPACE = 'CREDIX_LP_DEPOSITORY';

const CREDIX_LP_INTERNAL_CREDIX_MARKETPLACE_NAMESPACE = 'credix-marketplace';
const CREDIX_LP_INTERNAL_CREDIX_PASS_NAMESPACE = 'credix-pass';
const CREDIX_LP_INTERNAL_PROGRAM_STATE_NAMESPACE = 'program-state';

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
    public readonly credixProgramId: PublicKey,
    public readonly credixPoolOutstandingCredit: BN,
    public readonly credixReleaseTimestamp: BN,
    public readonly profitsBeneficiaryCollateral: PublicKey
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
    const credixGlobalMarketStateAddressPromise =
      this.findCredixGlobalMarketStateAddress(credixProgramId);
    const credixProgramStateAddressPromise =
      this.findCredixProgramStateAddress(credixProgramId);

    // We need to resolve the credix addresses before we progress further
    const credixGlobalMarketState = await credixGlobalMarketStateAddressPromise;
    const credixProgramState = await credixProgramStateAddressPromise;

    // Then derive remaining credix internal accounts that depends on the above
    const credixSigningAuthorityPromise =
      this.findCredixSigningAuthorityAddress(
        credixGlobalMarketState,
        credixProgramId
      );

    // Then we can find the depository address
    const depository = await this.findDepositoryAddress(
      credixGlobalMarketState,
      collateralMint,
      uxdProgramId
    );
    // Then the credix pass which depends on the depository
    const credixPass = await this.findCredixPassAddress(
      credixGlobalMarketState,
      depository,
      credixProgramId
    );

    // Fetch the on chain state of our own depository
    const uxdProgram = this.getUxdProgram(connection, uxdProgramId);
    const depositoryAccountPromise = this.getUxdCredixLpDepositoryAccount(
      uxdProgram,
      depository
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

    // It will be useful to check the data we have onchain (if it exists)
    let profitsBeneficiaryCollateral = new PublicKey(0);
    try {
      const depositoryAccount = await depositoryAccountPromise;
      profitsBeneficiaryCollateral =
        depositoryAccount.profitsBeneficiaryCollateral;
    } catch {
      // If we fail here, its ok, the depository might not exist yet
      // We just wont be able to collect the profits, everything else will work
    }

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

    // Resolve final informations when all scheduled work is done
    const collateralDecimals = await collateralDecimalsPromise;
    const credixSigningAuthority = await credixSigningAuthorityPromise;
    const credixLiquidityCollateral = this.findCredixLiquidityCollateralAddress(
      credixSigningAuthority,
      collateralMint
    );

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
      credixProgramId,
      credixPoolOutstandingCredit,
      credixReleaseTimestamp,
      profitsBeneficiaryCollateral
    );
  }

  private static async findDepositoryAddress(
    credixGlobalMarketState: PublicKey,
    collateralMint: PublicKey,
    uxdProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [
          Buffer.from(CREDIX_LP_DEPOSITORY_NAMESPACE),
          credixGlobalMarketState.toBuffer(),
          collateralMint.toBuffer(),
        ],
        uxdProgramId
      )
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

  private static async findCredixProgramStateAddress(
    credixProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [Buffer.from(CREDIX_LP_INTERNAL_PROGRAM_STATE_NAMESPACE)],
        credixProgramId
      )
    )[0];
  }

  private static async findCredixGlobalMarketStateAddress(
    credixProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [Buffer.from(CREDIX_LP_INTERNAL_CREDIX_MARKETPLACE_NAMESPACE)],
        credixProgramId
      )
    )[0];
  }

  private static async findCredixSigningAuthorityAddress(
    credixGlobalMarketState: PublicKey,
    credixProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [credixGlobalMarketState.toBuffer()],
        credixProgramId
      )
    )[0];
  }

  private static findCredixLiquidityCollateralAddress(
    credixSigningAuthority: PublicKey,
    collateralMint: PublicKey
  ): PublicKey {
    return findATAAddrSync(credixSigningAuthority, collateralMint)[0];
  }

  private static async findCredixPassAddress(
    credixGlobalMarketState: PublicKey,
    depository: PublicKey,
    credixProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [
          credixGlobalMarketState.toBuffer(),
          depository.toBuffer(),
          Buffer.from(CREDIX_LP_INTERNAL_CREDIX_PASS_NAMESPACE),
        ],
        credixProgramId
      )
    )[0];
  }

  private static findCredixMultisigCollateralAddress(
    credixMultisigKey: PublicKey,
    collateralMint: PublicKey
  ): PublicKey {
    return findATAAddrSync(credixMultisigKey, collateralMint)[0];
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
      throw new Error('Could not read credixGlobalMarketState account');
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
      throw new Error('Could not read credixProgramState account');
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
      throw new Error('Could not read credixPass account');
    }
    return credixPassAccount;
  }

  public static async getCollateralDecimals(
    connection: Connection,
    collateralMint: PublicKey
  ): Promise<number> {
    const collateralToken = new Token(
      connection,
      collateralMint,
      TOKEN_PROGRAM_ID,
      null as unknown as Signer
    );
    const collateralInfo = await collateralToken.getMintInfo();
    if (!collateralInfo) {
      throw new Error('Cannot find the collateral mint');
    }
    return collateralInfo.decimals;
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

  public static getUxdProgram(connection: Connection, uxdProgramId: PublicKey) {
    const provider = new AnchorProvider(
      connection,
      {} as Wallet,
      AnchorProvider.defaultOptions()
    );
    return new Program<Uxd>(IDL, uxdProgramId, provider);
  }

  public static async getUxdCredixLpDepositoryAccount(
    uxdProgram: Program<Uxd>,
    depository: PublicKey
  ) {
    const uxdCredixLpDepositoryAccount =
      await uxdProgram.account.credixLpDepository.fetchNullable(depository);
    if (!uxdCredixLpDepositoryAccount) {
      throw new Error('Could not read uxd CredixLpDepository account');
    }
    return uxdCredixLpDepositoryAccount;
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
