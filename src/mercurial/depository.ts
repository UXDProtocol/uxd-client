import {
  AnchorProvider,
  BorshAccountsCoder,
  Program,
} from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey, Signer } from '@solana/web3.js';
import { IDL } from '../idl';
import { MercurialVaultDepositoryAccount } from '../interfaces';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  IDL as mercurialVaultIDL,
  Vault as MercurialVaultIDL,
} from './vaultIdl';
import {
  IdlTypes,
  TypeDef,
} from '@project-serum/anchor/dist/cjs/program/namespace/types';

type VaultState = TypeDef<
  MercurialVaultIDL['accounts']['0'],
  IdlTypes<MercurialVaultIDL>
>;

const VAULT_BASE_KEY = new PublicKey(
  'HWzXGcGHy4tcpYfaRDCyLNzXqBTv3E6BttpCH2vJxArv'
);

export class MercurialVaultDepository {
  public static readonly mercurialVaultProgramId = new PublicKey(
    '24Uqj9JCLxUeoC3hGfh5W3s9FM9uCHDS2SG3LYwBpyTi'
  );

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
    public readonly mercurialVaultCollateralTokenSafe: PublicKey
  ) {}

  public static async initialize({
    connection,
    collateralMint,
    uxdProgramId,
  }: {
    connection: Connection;
    collateralMint: {
      mint: PublicKey;
      name: string;
      symbol: string;
      decimals: number;
    };
    uxdProgramId: PublicKey;
  }): Promise<MercurialVaultDepository> {
    const provider = new AnchorProvider(
      connection,
      {} as any,
      AnchorProvider.defaultOptions()
    );
    const mercurialVaultProgram = new Program<MercurialVaultIDL>(
      mercurialVaultIDL as MercurialVaultIDL,
      MercurialVaultDepository.mercurialVaultProgramId,
      provider
    );

    const [vaultPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('vault'),
        collateralMint.mint.toBuffer(),
        VAULT_BASE_KEY.toBuffer(),
      ],
      MercurialVaultDepository.mercurialVaultProgramId
    );

    const [tokenVaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('token_vault'), vaultPda.toBuffer()],
      MercurialVaultDepository.mercurialVaultProgramId
    );

    const [pda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('MERCURIALVAULTDEPOSITORY'),
        vaultPda.toBuffer(),
        collateralMint.mint.toBuffer(),
      ],
      uxdProgramId
    );

    const [depositoryLpTokenVault] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('MERCURIALVAULTDEPOSITORYLPVAULT'),
        vaultPda.toBuffer(),
        collateralMint.mint.toBuffer(),
      ],
      uxdProgramId
    );

    const vaultState = (await mercurialVaultProgram.account.vault.fetchNullable(
      vaultPda
    )) as VaultState | null;

    if (!vaultState) {
      throw new Error('Cannot get vault state');
    }

    const lpMintToken = new Token(
      connection,
      vaultState.lpMint,
      TOKEN_PROGRAM_ID,
      null as unknown as Signer
    );
    const lpMintInfo = await lpMintToken.getMintInfo();

    if (!lpMintInfo) {
      throw new Error('Cannot load vault lp mint info');
    }

    const mercurialVaultLpMint = {
      mint: vaultState.lpMint,
      decimals: lpMintInfo.decimals,
    };

    const mercurialVaultCollateralTokenSafe = tokenVaultPda;

    return new MercurialVaultDepository(
      pda,
      collateralMint,
      vaultPda,
      mercurialVaultLpMint,
      depositoryLpTokenVault,
      mercurialVaultCollateralTokenSafe
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
