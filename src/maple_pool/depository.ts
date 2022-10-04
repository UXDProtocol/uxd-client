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

export class MaplePoolDepository {
  public constructor(
    public readonly pda: PublicKey,
    public readonly collateralMint: {
      mint: PublicKey;
      name: string;
      symbol: string;
      decimals: number;
    },
    public readonly maplePool: PublicKey,
    public readonly maplePoolLpMint: {
      mint: PublicKey;
      decimals: number;
    },
    public readonly depositoryLpTokenVault: PublicKey,
    public readonly maplePoolCollateralTokenSafe: PublicKey,
    public readonly maplePoolProgram: PublicKey,
    public readonly vault: VaultImpl
  ) {}

  public static async initialize({
    connection,
    collateralMint,
    uxdProgramId,
    cluster,
  }: {
    connection: Connection;
    collateralMint: {
      mint: PublicKey;
      name: string;
      symbol: string;
      decimals: number;
    };
    uxdProgramId: PublicKey;
    cluster: Cluster;
  }): Promise<MaplePoolDepository> {
    const vault = await VaultImpl.create(
      connection,
      {
        // Only the address field is used in the TokenInfo structure
        address: collateralMint.mint.toBase58(),
      } as TokenInfo,
      {
        cluster,
      }
    );

    const [pda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('MAPLE_POOL_DEPOSITORY'),
        vault.vaultPda.toBuffer(),
        collateralMint.mint.toBuffer(),
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
