import { BorshAccountsCoder } from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey, Signer } from '@solana/web3.js';
import { IDL } from '../idl';
import { CredixLpDepositoryAccount } from '../interfaces';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { findATAAddrSync } from '../utils';
import { AnchorProvider } from '@project-serum/anchor';
import {
  IDL as credixIDL,
  Credix as CredixIDL,
} from './credixIdl';
import { Program } from '@project-serum/anchor';

const CREDIX_LP_DEPOSITORY_NAMESPACE = 'CREDIX_LP_DEPOSITORY';

const CREDIX_LP_INTERNAL_CREDIX_PASS_NAMESPACE = 'credix-pass';
const CREDIX_LP_INTERNAL_PROGRAM_STATE_NAMESPACE = 'program-state';
const CREDIX_LP_INTERNAL_LP_TOKEN_MINT_NAMESPACE = 'lp-token-mint';

export class CredixLpDepository {
  public readonly credixMarketName = "credix-marketplace";

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
  ) {}

  public static async initialize({
    connection,
    uxdProgramId,
    collateralMint,
    collateralSymbol,
    credixProgramId,
    credixMarketName,
  }: {
    connection: Connection;
    uxdProgramId: PublicKey;
    collateralMint: PublicKey;
    collateralSymbol: string;
    credixProgramId: PublicKey;
    credixMarketName: string;
  }): Promise<CredixLpDepository> {

    // First we need the credix market address
    const credixGlobalMarketState = await this.findCredixGlobalMarketState(
      credixMarketName,
      credixProgramId
    );

    // Then we can find the depository
    const [depository] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(CREDIX_LP_DEPOSITORY_NAMESPACE),
        credixGlobalMarketState.toBuffer(),
        collateralMint.toBuffer(),
      ],
      uxdProgramId
    );

    // The read the collateral mint
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
    const collateralDecimals = collateralInfo.decimals;

    // Then read all the credix internal accounts
    const credixProgramState = await this.findCredixProgramState(
      credixProgramId
    );
    const credixSigningAuthority = await this.findCredixSigningAuthority(
      credixGlobalMarketState,
      credixProgramId
    );
    const credixLiquidityCollateral = await this.findCredixLiquidityCollateral(
      credixSigningAuthority,
      collateralMint
    );
    const credixSharesMint = await this.findCredixSharesMint(
      credixGlobalMarketState,
      credixProgramId
    );
    const credixPass = await this.findCredixPass(
      credixGlobalMarketState,
      depository,
      credixProgramId
    );

    // Then generate the depository token accounts
    const depositoryCollateral = await this.findDepositoryCollateralAddress(
      depository,
      collateralMint
    );
    const depositoryShares = await this.findDepositorySharesAddress(
      depository,
      credixSharesMint
    );

    // Load credix IDL to be able to read onchain data
    const provider = new AnchorProvider(
      connection,
      {} as any,
      AnchorProvider.defaultOptions()
    );
    const credixProgram = new Program<CredixIDL>(
      credixIDL,
      credixProgramId,
      provider
    );

    // Then we read the content of the credixProgramState
    const credixProgramStateData = await credixProgram.account.programState.fetchNullable(credixProgramState);
    if (!credixProgramStateData) {
      throw new Error('Could not read credixProgramState');
    }

    // Then we read the content of the credixGlobalMarketState
    const credixGlobalMarketStateData = await credixProgram.account.globalMarketState.fetchNullable(credixGlobalMarketState);
    if (!credixGlobalMarketStateData) {
      throw new Error('Could not read credixGlobalMarketState');
    }

    // We now have all the data we need
    const credixTreasuryCollateral = credixProgramStateData.treasuryPoolTokenAccount;
    const credixMultisigKey = credixGlobalMarketStateData.credixMultisigKey;
    const credixMultisigCollateral = await this.findCredixMultisigCollateral(
      credixMultisigKey,
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
    );
  }

  private static async findDepositoryCollateralAddress(
    depository: PublicKey,
    collateralMint: PublicKey
  ) {
    return findATAAddrSync(depository, collateralMint)[0];
  }

  private static async findDepositorySharesAddress(
    depository: PublicKey,
    credixSharesMint: PublicKey
  ) {
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
    credixMarketName: string,
    credixProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [Buffer.from(credixMarketName)],
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

  private static async findCredixLiquidityCollateral(
    credixSigningAuthority: PublicKey,
    collateralMint: PublicKey
  ): Promise<PublicKey> {
    return findATAAddrSync(credixSigningAuthority, collateralMint)[0];
  }

  private static async findCredixSharesMint(
    credixGlobalMarketState: PublicKey,
    credixProgramId: PublicKey
  ) {
    return (
      await PublicKey.findProgramAddress(
        [
          credixGlobalMarketState.toBuffer(),
          Buffer.from(CREDIX_LP_INTERNAL_LP_TOKEN_MINT_NAMESPACE),
        ],
        credixProgramId
      )
    )[0];
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

  private static async findCredixMultisigCollateral(
    credixMultisigKey: PublicKey,
    collateralMint: PublicKey
  ): Promise<PublicKey> {
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
