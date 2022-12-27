import {
  BorshAccountsCoder,
  Wallet,
  AnchorProvider,
  Program,
} from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey, Signer } from '@solana/web3.js';
import { IDL } from '../idl';
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
    public readonly credixProgramId: PublicKey
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
    // First we need the credix global market state address
    const credixGlobalMarketStatePromise =
      this.findCredixGlobalMarketState(credixProgramId);
    // Then the credix program state address
    const credixProgramStatePromise =
      this.findCredixProgramState(credixProgramId);

    // Then schedule reading the collateral mint
    const collateralToken = new Token(
      connection,
      collateralMint,
      TOKEN_PROGRAM_ID,
      null as unknown as Signer
    );
    const collateralInfoPromise = collateralToken.getMintInfo();

    // Load credix IDL to be able to read onchain data
    const provider = new AnchorProvider(
      connection,
      {} as Wallet,
      AnchorProvider.defaultOptions()
    );
    const credixProgram = new Program<CredixIDL>(
      credixIDL,
      credixProgramId,
      provider
    );

    // Now we read the results from initial finds
    const credixGlobalMarketState = await credixGlobalMarketStatePromise;
    const credixProgramState = await credixProgramStatePromise;

    // Then we schedule reading the content of the credixGlobalMarketState onchain
    const credixGlobalMarketStateDataPromise =
      credixProgram.account.globalMarketState.fetchNullable(
        credixGlobalMarketState
      );
    // Then we schedule reading the content of the credixProgramState onchain
    const credixProgramStateDataPromise =
      credixProgram.account.programState.fetchNullable(credixProgramState);

    // Then we can find the depository
    const [depository] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(CREDIX_LP_DEPOSITORY_NAMESPACE),
        credixGlobalMarketState.toBuffer(),
        collateralMint.toBuffer(),
      ],
      uxdProgramId
    );

    // Then derive remaining credix internal accounts from other PDAs
    const credixSigningAuthorityPromise = this.findCredixSigningAuthority(
      credixGlobalMarketState,
      credixProgramId
    );
    const credixPassPromise = this.findCredixPass(
      credixGlobalMarketState,
      depository,
      credixProgramId
    );

    // Verify that all reading was successful
    const credixGlobalMarketStateData =
      await credixGlobalMarketStateDataPromise;
    if (!credixGlobalMarketStateData) {
      throw new Error('Could not read credixGlobalMarketState');
    }
    const credixProgramStateData = await credixProgramStateDataPromise;
    if (!credixProgramStateData) {
      throw new Error('Could not read credixProgramState');
    }

    // We now have all the data we need from the onchain credix configuration
    const credixSharesMint = credixGlobalMarketStateData.lpTokenMint;
    const credixTreasuryCollateral =
      credixGlobalMarketStateData.treasuryPoolTokenAccount;
    const credixMultisigKey = credixProgramStateData.credixMultisigKey;
    const credixMultisigCollateral = this.findCredixMultisigCollateral(
      credixMultisigKey,
      collateralMint
    );

    // Then generate the depository token accounts
    const depositoryCollateral = this.findDepositoryCollateralAddress(
      depository,
      collateralMint
    );
    const depositoryShares = this.findDepositorySharesAddress(
      depository,
      credixSharesMint
    );

    // Finally we read the result from the collateral info reading
    const collateralInfo = await collateralInfoPromise;
    if (!collateralInfo) {
      throw new Error('Cannot find the collateral mint');
    }
    const collateralDecimals = collateralInfo.decimals;

    // Resolve final informations when all scheduled work is done
    const credixSigningAuthority = await credixSigningAuthorityPromise;
    const credixLiquidityCollateral = this.findCredixLiquidityCollateral(
      credixSigningAuthority,
      collateralMint
    );
    const credixPass = await credixPassPromise;

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
      credixProgramId
    );
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

  private static async findCredixProgramState(
    credixProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [Buffer.from(CREDIX_LP_INTERNAL_PROGRAM_STATE_NAMESPACE)],
        credixProgramId
      )
    )[0];
  }

  private static async findCredixGlobalMarketState(
    credixProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [Buffer.from(CREDIX_LP_INTERNAL_CREDIX_MARKETPLACE_NAMESPACE)],
        credixProgramId
      )
    )[0];
  }

  private static async findCredixSigningAuthority(
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

  private static findCredixLiquidityCollateral(
    credixSigningAuthority: PublicKey,
    collateralMint: PublicKey
  ): PublicKey {
    return findATAAddrSync(credixSigningAuthority, collateralMint)[0];
  }

  private static async findCredixPass(
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

  private static findCredixMultisigCollateral(
    credixMultisigKey: PublicKey,
    collateralMint: PublicKey
  ): PublicKey {
    return findATAAddrSync(credixMultisigKey, collateralMint)[0];
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
