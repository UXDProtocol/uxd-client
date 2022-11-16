import { BorshAccountsCoder } from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey, Signer } from '@solana/web3.js';
import { IDL } from '../idl';
import { CredixLpDepositoryAccount } from '../interfaces';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { findATAAddrSync } from '../utils';

const CREDIX_LP_DEPOSITORY_NAMESPACE = 'CREDIX_LP_DEPOSITORY';
const CREDIX_LP_DEPOSITORY_COLLATERAL_NAMESPACE =
  'CREDIX_LP_DEPOSITORY_COLLATERAL';
const CREDIX_LP_DEPOSITORY_LP_SHARES_NAMESPACE =
  'CREDIX_LP_DEPOSITORY_LP_SHARES';

const CREDIX_LP_INTERNAL_PASS_NAMESPACE = 'credix-pass';
const CREDIX_LP_INTERNAL_PROGRAM_STATE_NAMESPACE = 'program-state';
const CREDIX_LP_INTERNAL_LP_TOKEN_MINT_NAMESPACE = 'lp-token-mint';

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
    public readonly credixTreasuryCollateral: PublicKey,
    public readonly credixLiquidityCollateral: PublicKey,
    public readonly credixSharesMint: PublicKey,
    public readonly credixPass: PublicKey,
    public readonly credixProgramId: PublicKey
  ) {}

  public static async initialize({
    connection,
    uxdProgramId,
    credixProgramId,
    collateralMint,
    collateralSymbol,
    credixGlobalMarketState,
    credixTreasuryCollateral,
  }: {
    connection: Connection;
    uxdProgramId: PublicKey;
    credixProgramId: PublicKey;
    collateralMint: PublicKey;
    collateralSymbol: string;
    credixGlobalMarketState: PublicKey;
    credixTreasuryCollateral: PublicKey;
  }): Promise<CredixLpDepository> {
    // The depository is PDA from the pool and the collateral
    const [depository] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(CREDIX_LP_DEPOSITORY_NAMESPACE),
        credixGlobalMarketState.toBuffer(),
        collateralMint.toBuffer(),
      ],
      uxdProgramId
    );

    // Read collateral decimals
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

    const depositoryCollateral = await this.findDepositoryCollateralAddress(
      depository,
      uxdProgramId
    );
    const depositoryShares = await this.findDepositorySharesAddress(
      depository,
      uxdProgramId
    );

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
      credixTreasuryCollateral,
      credixLiquidityCollateral,
      credixSharesMint,
      credixPass,
      credixProgramId
    );
  }

  private static async findDepositoryCollateralAddress(
    depository: PublicKey,
    uxdProgramId: PublicKey
  ) {
    return (
      await PublicKey.findProgramAddress(
        [
          Buffer.from(CREDIX_LP_DEPOSITORY_COLLATERAL_NAMESPACE),
          depository.toBytes(),
        ],
        uxdProgramId
      )
    )[0];
  }

  private static async findDepositorySharesAddress(
    depository: PublicKey,
    uxdProgramId: PublicKey
  ) {
    return (
      await PublicKey.findProgramAddress(
        [
          Buffer.from(CREDIX_LP_DEPOSITORY_LP_SHARES_NAMESPACE),
          depository.toBytes(),
        ],
        uxdProgramId
      )
    )[0];
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

  private static async findCredixSigningAuthority(
    credixGlobalMarketState: PublicKey,
    credixProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [credixGlobalMarketState.toBytes()],
        credixProgramId
      )
    )[0];
  }

  private static async findCredixLiquidityCollateral(
    credixSigningAuthority: PublicKey,
    collateralMint: PublicKey
  ): Promise<PublicKey> {
    return (await findATAAddrSync(credixSigningAuthority, collateralMint))[0];
  }

  private static async findCredixSharesMint(
    credixGlobalMarketState: PublicKey,
    credixProgramId: PublicKey
  ) {
    return (
      await PublicKey.findProgramAddress(
        [
          credixGlobalMarketState.toBytes(),
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
          credixGlobalMarketState.toBytes(),
          depository.toBytes(),
          Buffer.from(CREDIX_LP_INTERNAL_PASS_NAMESPACE),
        ],
        credixProgramId
      )
    )[0];
  }

  public info() {
    console.groupCollapsed('[Maple Pool Depository debug info]');
    console.table({
      ['pda']: this.pda.toBase58(),
      ['collateralMint']: this.collateralMint.toBase58(),
      ['collateralDecimals']: this.collateralDecimals,
      ['collateralSymbol']: this.collateralSymbol,
      ['depositoryCollateral']: this.depositoryCollateral.toBase58(),
      ['depositoryShares']: this.depositoryShares.toBase58(),
      ['credixProgramState']: this.credixProgramState.toBase58(),
      ['credixGlobalMarketState']: this.credixGlobalMarketState.toBase58(),
      ['credixSigningAuthority']: this.credixSigningAuthority.toBase58(),
      ['credixTreasuryCollateral']: this.credixTreasuryCollateral.toBase58(),
      ['credixLiquidityCollateral']: this.credixLiquidityCollateral.toBase58(),
      ['credixSharesMint']: this.credixSharesMint.toBase58(),
      ['credixPass']: this.credixPass.toBase58(),
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
      throw new Error('credixPoolDepository not found');
    }

    return coder.decode('credixPoolDepository', result.data);
  }
}
