import { StaticTokenListResolutionStrategy } from "@solana/spl-token-registry";
import VaultImpl, { PROGRAM_ID } from '@mercurial-finance/vault-sdk';
import { BorshAccountsCoder } from '@project-serum/anchor';
import { Cluster, ConfirmOptions, Connection, PublicKey } from '@solana/web3.js';
import { IDL } from '../idl';
import { MercurialVaultDepositoryAccount } from '../interfaces';

export class MercurialVaultDepository {
    public constructor(
        public readonly pda: PublicKey,
        public readonly collateralMintName: string,
        public readonly collateralMintSymbol: string,
        public readonly collateralMint: PublicKey,
        public readonly collateralMintDecimals: number,
        public readonly mercurialVault: PublicKey,
        public readonly mercurialVaultLpMint: PublicKey,
        public readonly mercurialVaultLpMinDecimals: number,
        public readonly depositoryLpTokenVault: PublicKey,
        public readonly mercurialVaultProgramCollateralTokenVault: PublicKey,
        public readonly mercurialVaultProgram: PublicKey,
    ) { }

    public static async initialize({
        connection,
        collateralMintName,
        collateralMintSymbol,
        collateralMint,
        collateralMintDecimals,
        uxdProgramId,
        cluster,
    }: {
        connection: Connection,
        collateralMintName: string;
        collateralMintSymbol: string;
        collateralMint: PublicKey;
        collateralMintDecimals: number;
        uxdProgramId: PublicKey;
        cluster: Cluster;
    }): Promise<MercurialVaultDepository> {
        const tokenMap = new StaticTokenListResolutionStrategy().resolve();
        const tokenInfo = tokenMap.find(token => token.address === collateralMint.toBase58());

        if (!tokenInfo) {
            throw new Error(`Cannot find token infos about provided collateral mint ${collateralMint.toBase58()}`);
        }

        const mercurialVault = await VaultImpl.create(
            connection,
            tokenInfo,
            {
                cluster,
            },
        );

        const [pda] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('MERCURIALVAULTDEPOSITORY'),
                collateralMint.toBuffer(),
            ],
            uxdProgramId,
        );

        const [depositoryVTokenVault] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('MERCURIALVAULTDEPOSITORY'),
                collateralMint.toBuffer(),
                mercurialVault.vaultState.lpMint.toBuffer(),
            ],
            uxdProgramId,
        );

        mercurialVault.vaultState.lpMint

        return new MercurialVaultDepository(
            pda,
            collateralMintName,
            collateralMintSymbol,
            collateralMint,
            collateralMintDecimals,
            mercurialVault.vaultPda,
            mercurialVault.vaultState.lpMint,
            // TODO: get the lpMint decimals dynamically
            9,
            depositoryVTokenVault,
            mercurialVault.vaultState.tokenVault,
            new PublicKey(PROGRAM_ID),
        );
    }

    public info() {
        console.groupCollapsed(
            '[Mercurial Vault Depository debug info - Collateral mint:',
            this.collateralMintSymbol,
            ' - decimals',
            this.collateralMintDecimals,
            ']'
        );
        console.table({
            ['pda']: this.pda.toBase58(),
            ['collateralMint']: this.collateralMint.toBase58(),
            ['collateralMintSymbol']: this.collateralMintSymbol.toString(),
            ['collateralMintDecimals']: this.collateralMintDecimals.toString(),
            ['mercurialVault']: this.mercurialVault.toBase58(),
            ['mercurialVaultLpMint']: this.mercurialVaultLpMint.toBase58(),
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
            throw new Error('mercurialVaultDepositoryAccount not found');
        }
        return coder.decode('mercurialVaultDepository', result.data);
    }
}
