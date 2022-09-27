import VaultImpl, { PROGRAM_ID } from '@mercurial-finance/vault-sdk';
import { BorshAccountsCoder } from '@project-serum/anchor';
import {
  Cluster,
  ConfirmOptions,
  Connection,
  PublicKey,
  Signer,
} from '@solana/web3.js';
import { IDL } from '../idl';
import { MercurialVaultDepositoryAccount } from '../interfaces';
import { TokenInfo } from '@solana/spl-token-registry';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

export class MercurialVaultDepository {
  public constructor(
    public readonly pda: PublicKey,
    public readonly collateralMint: {
      mint: PublicKey;
      name: string;
      symbol: string;
      decimals: number;
    },
    public readonly mercurialVault: PublicKey,
    public readonly mercurialVaultLpMint: {
      mint: PublicKey;
      decimals: number;
    },
    public readonly depositoryLpTokenVault: PublicKey,
    public readonly mercurialVaultCollateralTokenSafe: PublicKey,
    public readonly mercurialVaultProgram: PublicKey,
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
  }): Promise<MercurialVaultDepository> {
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
        Buffer.from('MERCURIALVAULTDEPOSITORY'),
        vault.vaultPda.toBuffer(),
        collateralMint.mint.toBuffer(),
      ],
      uxdProgramId
    );

    const [depositoryLpTokenVault] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('MERCURIALVAULTDEPOSITORYLPVAULT'),
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

    const mercurialVaultLpMint = {
      mint: vault.vaultState.lpMint,
      decimals: lpMintInfo.decimals,
    };

    const mercurialVaultCollateralTokenSafe = vault.tokenVaultPda;

    return new MercurialVaultDepository(
      pda,
      collateralMint,
      vault.vaultPda,
      mercurialVaultLpMint,
      depositoryLpTokenVault,
      mercurialVaultCollateralTokenSafe,
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
      ['mercurialVault']: this.mercurialVault.toBase58(),
      ['mercurialVaultLpMint']: this.mercurialVaultLpMint.mint.toBase58(),
      ['depositoryLpTokenVault']: this.depositoryLpTokenVault.toBase58(),
    });
    console.groupEnd();
  }

  public async getOnchainAccount(
    connection: Connection,
    options: ConfirmOptions
  ): Promise<MercurialVaultDepositoryAccount> {
    const coder = new BorshAccountsCoder(IDL);

    const result = await connection.getAccountInfo(
      this.pda,
      options.commitment
    );

    if (!result) {
      throw new Error('mercurialVaultDepository not found');
    }

    return coder.decode('mercurialVaultDepository', result.data);
  }
}
