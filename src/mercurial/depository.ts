import { getVaultPdas, PROGRAM_ID } from '@mercurial-finance/vault-sdk';
import { BorshAccountsCoder } from '@project-serum/anchor';
import { Cluster, ConfirmOptions, Connection, PublicKey } from '@solana/web3.js';
import { IDL } from '../idl';
import { MercurialVaultDepositoryAccount } from '../interfaces';

// Same PublicKey used for mainnet and devnet
const MERCURIAL_VAULT_PROGRAM_ID_MAINNET = new PublicKey(PROGRAM_ID);
const MERCURIAL_VAULT_PROGRAM_ID_DEVNET = new PublicKey(PROGRAM_ID);

const invalidClusterError = 'Invalid cluster';

export class MercurialVaultDepository {
    public constructor(
        public readonly pda: PublicKey,
        public readonly collateralMintName: string,
        public readonly collateralMintSymbol: string,
        public readonly collateralMint: PublicKey,
        public readonly collateralMintDecimals: number,
        public readonly mercurialVault: PublicKey,
        public readonly mercurialVaultLpMint: PublicKey,
        public readonly depositoryVTokenVault: PublicKey,
    ) { }

    public async initialize({
        collateralMintName,
        collateralMintSymbol,
        collateralMint,
        collateralMintDecimals,
        uxdProgramId,
        cluster,
    }: {
        collateralMintName: string;
        collateralMintSymbol: string;
        collateralMint: PublicKey;
        collateralMintDecimals: number;
        uxdProgramId: PublicKey;
        cluster: Cluster;
    }): Promise<MercurialVaultDepository> {
        let mercurialVaultProgramId: PublicKey;

        switch (cluster) {
            case 'mainnet-beta':
                mercurialVaultProgramId = MERCURIAL_VAULT_PROGRAM_ID_MAINNET;
                break;
            case 'devnet':
                mercurialVaultProgramId = MERCURIAL_VAULT_PROGRAM_ID_DEVNET;
                break;
            default: {
                throw invalidClusterError;
            }
        }

        const {
            vaultPda: mercurialVault,
            lpMintPda: mercurialVaultLpMint,
        } = await getVaultPdas(collateralMint, mercurialVaultProgramId);

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
                mercurialVaultLpMint.toBuffer(),
            ],
            uxdProgramId,
        );

        return new MercurialVaultDepository(
            pda,
            collateralMintName,
            collateralMintSymbol,
            collateralMint,
            collateralMintDecimals,
            mercurialVault,
            mercurialVaultLpMint,
            depositoryVTokenVault,
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
            ['depositoryVTokenVault']: this.depositoryVTokenVault.toBase58(),
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
