import { BorshAccountsCoder } from '@project-serum/anchor';
import {
  Cluster,
  ConfirmOptions,
  Connection,
  PublicKey,
  Signer,
} from '@solana/web3.js';
import { IDL } from '../idl';
import { MaplePoolDepositoryAccount } from '../interfaces';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { findATAAddrSync } from '../utils';

const MAPLE_POOL_DEPOSITORY_NAMESPACE = 'MAPLE_POOL_DEPOSITORY';
const MAPLE_POOL_DEPOSITORY_COLLATERAL_NAMESPACE =
  'MAPLE_POOL_DEPOSITORY_COLLATERAL';

const MAPLE_INTERNAL_LENDER_NAMESPACE = 'lender';
const MAPLE_INTERNAL_LOCKED_SHARES_NAMESPACE = 'locked_shares';

export class MaplePoolDepository {
  public static SYRUP_PROGRAM_ID = new PublicKey(
    '5D9yi4BKrxF8h65NkVE1raCCWFKUs5ngub2ECxhvfaZe'
  );

  public static POOL_CREDORA_USDC = {
    maplePool: new PublicKey('TamdAwg85s9aZ6mwSeAHoczzAV53rFokL5FVKzaF1Tb'),
    maplePoolLocker: new PublicKey(
      '92oAd9cm4rV4K4Xx9HPRMoFn7GwMaKsjNSPe7QVxywcy'
    ),
    mapleGlobals: new PublicKey('DtnAPKSHwJaYbFdjYibNcjxihVd6pK1agpT86N5tMVPX'),
    mapleSharesMint: new PublicKey(
      'CesxqgX4BvYudTNU45PArqTgefrRFhE1CwR7ECTDshfY'
    ),
  };

  public constructor(
    public readonly pda: PublicKey,
    public readonly collateralMint: PublicKey,
    public readonly collateralDecimals: number,
    public readonly collateralSymbol: string,
    public readonly depositoryCollateral: PublicKey,
    public readonly maplePool: PublicKey,
    public readonly maplePoolLocker: PublicKey,
    public readonly mapleGlobals: PublicKey,
    public readonly mapleLender: PublicKey,
    public readonly mapleSharesMint: PublicKey,
    public readonly mapleLockedShares: PublicKey,
    public readonly mapleLenderShares: PublicKey,
    public readonly syrupProgramId: PublicKey
  ) {}

  public static async initialize({
    connection,
    uxdProgramId,
    syrupProgramId,
    collateralMint,
    collateralSymbol,
    maplePool,
    maplePoolLocker,
    mapleGlobals,
    mapleSharesMint,
  }: {
    connection: Connection;
    uxdProgramId: PublicKey;
    syrupProgramId: PublicKey;
    collateralMint: PublicKey;
    collateralSymbol: string;
    maplePool: PublicKey;
    maplePoolLocker: PublicKey;
    mapleGlobals: PublicKey;
    mapleSharesMint: PublicKey;
    cluster: Cluster;
  }): Promise<MaplePoolDepository> {
    // The depository is PDA from the pool and the collateral
    const [depository] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(MAPLE_POOL_DEPOSITORY_NAMESPACE),
        maplePool.toBuffer(),
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

    const mapleLender = await this.findLenderAddress(
      maplePool,
      depository,
      syrupProgramId
    );

    const mapleLockedShares = await this.findLockedSharesAddress(
      mapleLender,
      syrupProgramId
    );
    const mapleLenderShares = await this.findLenderSharesAddress(
      depository,
      mapleSharesMint
    );

    return new MaplePoolDepository(
      depository,
      collateralMint,
      collateralDecimals,
      collateralSymbol,
      depositoryCollateral,
      maplePool,
      maplePoolLocker,
      mapleGlobals,
      mapleLender,
      mapleSharesMint,
      mapleLockedShares,
      mapleLenderShares,
      syrupProgramId
    );
  }

  private static async findDepositoryCollateralAddress(
    depository: PublicKey,
    uxdProgramId: PublicKey
  ) {
    return (
      await PublicKey.findProgramAddress(
        [
          Buffer.from(MAPLE_POOL_DEPOSITORY_COLLATERAL_NAMESPACE),
          depository.toBytes(),
        ],
        uxdProgramId
      )
    )[0];
  }

  private static async findLenderAddress(
    maplePool: PublicKey,
    depository: PublicKey,
    syrupProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [
          Buffer.from(MAPLE_INTERNAL_LENDER_NAMESPACE),
          maplePool.toBytes(),
          depository.toBytes(),
        ],
        syrupProgramId
      )
    )[0];
  }

  private static async findLenderSharesAddress(
    owner: PublicKey,
    mapleSharesMint: PublicKey
  ): Promise<PublicKey> {
    return (await findATAAddrSync(owner, mapleSharesMint))[0];
  }

  private static async findLockedSharesAddress(
    mapleLender: PublicKey,
    syrupProgramId: PublicKey
  ): Promise<PublicKey> {
    return (
      await PublicKey.findProgramAddress(
        [
          Buffer.from(MAPLE_INTERNAL_LOCKED_SHARES_NAMESPACE),
          mapleLender.toBytes(),
        ],
        syrupProgramId
      )
    )[0];
  }

  public info() {
    console.groupCollapsed('[Maple Pool Depository debug info]');
    console.table({
      ['pda']: this.pda.toBase58(),
      ['depositoryCollateral']: this.depositoryCollateral.toBase58(),
      ['collateralMint']: this.collateralMint.toBase58(),
      ['collateralDecimals']: this.collateralDecimals,
      ['collateralSymbol']: this.collateralSymbol,
      ['maplePool']: this.maplePool.toBase58(),
      ['maplePoolLocker']: this.maplePoolLocker.toBase58(),
      ['mapleGlobals']: this.mapleGlobals.toBase58(),
      ['mapleLender']: this.mapleLender.toBase58(),
      ['mapleSharesMint']: this.mapleSharesMint.toBase58(),
      ['mapleLockedShares']: this.mapleLockedShares.toBase58(),
      ['mapleLenderShares']: this.mapleLenderShares.toBase58(),
    });
    console.groupEnd();
  }

  public async getOnchainAccount(
    connection: Connection,
    options: ConfirmOptions
  ): Promise<MaplePoolDepositoryAccount> {
    const coder = new BorshAccountsCoder(IDL);

    const result = await connection.getAccountInfo(
      this.pda,
      options.commitment
    );

    if (!result) {
      throw new Error('maplePoolDepository not found');
    }

    return coder.decode('maplePoolDepository', result.data);
  }
}
