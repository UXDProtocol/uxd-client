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
import { TokenInfo } from '@solana/spl-token-registry';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

/*
bump
version
controller
collateral_mint
maple_pool
maple_shares_mint
maple_lender
maple_locked_shares
maple_lender_shares
accounting_supply_sheet
accounting_total_paid_stamp_fees
accounting_bps_stamp_fees
*/
const MAPLE_POOL_DEPOSITORY_NAMESPACE = 'MAPLE_POOL_DEPOSITORY';

export class MaplePoolDepository {
  public constructor(
    public readonly depository: PublicKey,
    public readonly collateralMint: PublicKey,
    public readonly maplePool: PublicKey,
    public readonly maplePoolSharesMint: PublicKey,
    public readonly mapleLender: PublicKey,
    public readonly mapleLockedShares: PublicKey,
    public readonly mapleLenderShares: PublicKey
  ) {}

  public static async initialize({
    connection,
    uxdProgramId,
    collateralMint,
    maplePool,
    maplePoolSharesMint: PublicKey,
    cluster,
  }: {
    connection: Connection;
    uxdProgramId: PublicKey;
    maplePool: PublicKey;
    collateralMint: PublicKey;
    cluster: Cluster;
  }): Promise<MaplePoolDepository> {
    const [depository] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(MAPLE_POOL_DEPOSITORY_NAMESPACE),
        maplePool.toBuffer(),
        collateralMint.toBuffer(),
      ],
      uxdProgramId
    );

    const lpMintToken = new Token(
      connection,
      vault.vaultState.lpMint,
      TOKEN_PROGRAM_ID,
      null as unknown as Signer
    );
    const lpMintInfo = await lpMintToken.getMintInfo();

    if (!lpMintInfo) {
      throw new Error('Cannot load vault lp mint info');
    }

    const maplePoolLpMint = {
      mint: vault.vaultState.lpMint,
      decimals: lpMintInfo.decimals,
    };

    const maplePoolCollateralTokenSafe = vault.tokenVaultPda;

    return new MaplePoolDepository(
      pda,
      collateralMint,
      vault.vaultPda,
      maplePoolLpMint,
      depositoryLpTokenVault,
      maplePoolCollateralTokenSafe,
      new PublicKey(PROGRAM_ID),
      vault
    );
  }

  public info() {
    console.groupCollapsed(
      '[Mercurial Vault Depository debug info - Collateral mint:',
      this.collateralMint.symbol,
      ' - decimals',
      this.collateralMint.decimals,
      ']'
    );
    console.table({
      ['pda']: this.pda.toBase58(),
      ['collateralMint']: this.collateralMint.mint.toBase58(),
      ['collateralMintSymbol']: this.collateralMint.symbol.toString(),
      ['collateralMintDecimals']: this.collateralMint.decimals.toString(),
      ['maplePool']: this.maplePool.toBase58(),
      ['maplePoolLpMint']: this.maplePoolLpMint.mint.toBase58(),
      ['depositoryLpTokenVault']: this.depositoryLpTokenVault.toBase58(),
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
