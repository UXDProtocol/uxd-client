import AmmImpl, { PROGRAM_ID } from '@mercurial-finance/dynamic-amm-sdk';
import { BorshAccountsCoder } from '@project-serum/anchor';
import { Cluster, ConfirmOptions, Connection, PublicKey } from '@solana/web3.js';
import { IDL } from '../idl';
import { MercurialPoolDepositoryAccount } from '../interfaces';
import { VAULT_PROGRAM_ID } from "@mercurial-finance/dynamic-amm-sdk/dist/cjs/src/amm/constants";

export class MercurialPoolDepository {
    public constructor(
        public readonly pda: PublicKey,
        public readonly collateralMint: {
            mint: PublicKey;
            name: string;
            symbol: string;
            decimals: number;
        },
        public readonly mercurialPool: PublicKey,
        public readonly mercurialPoolLpMint: {
            mint: PublicKey;
            decimals: number;
        },
        public readonly depositoryPoolLpTokenVault: PublicKey,
        public readonly mercurialPoolProgram: PublicKey,
        public readonly mercurialVaultProgram: PublicKey,
        public readonly pool: AmmImpl,
        public readonly mercurialPoolSecondaryToken: {
            mint: PublicKey;
            decimals: number;
        },
    ) { }

    public static async initialize({
        connection,
        collateralMint,
        mercurialPool,
        uxdProgramId,
        cluster,
    }: {
        connection: Connection,
        collateralMint: {
            mint: PublicKey;
            name: string;
            symbol: string;
            decimals: number;
        },
        mercurialPool: PublicKey;
        uxdProgramId: PublicKey;
        cluster: Cluster;
    }): Promise<MercurialPoolDepository> {
        const pool = await AmmImpl.create(connection, mercurialPool, {
            cluster,
        });

        const [pda] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('MERCURIALPOOLDEPOSITORY'),
                mercurialPool.toBuffer(),
                collateralMint.mint.toBuffer(),
            ],
            uxdProgramId,
        );

        const [depositoryPoolLpTokenVault] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('MERCURIALPOOLDEPOSITORYLPVAULT'),
                mercurialPool.toBuffer(),
                collateralMint.mint.toBuffer(),
            ],
            uxdProgramId,
        );

        const mercurialPoolLpMint = {
            mint: pool.poolState.lpMint,
            decimals: pool.decimals,
        };

        const mercurialPoolSecondaryToken = pool.tokenA.address === collateralMint.mint.toBase58() ? {
            mint: new PublicKey(pool.tokenB.address),
            decimals: pool.tokenB.decimals,
        } : {
            mint: new PublicKey(pool.tokenA.address),
            decimals: pool.tokenA.decimals,
        };

        return new MercurialPoolDepository(
            pda,
            collateralMint,
            mercurialPool,
            mercurialPoolLpMint,
            depositoryPoolLpTokenVault,
            new PublicKey(PROGRAM_ID),
            new PublicKey(VAULT_PROGRAM_ID),
            pool,
            mercurialPoolSecondaryToken,
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
            ['mercurialPool']: this.mercurialPool.toBase58(),
            ['mercurialPoolLpMint']: this.mercurialPoolLpMint.mint.toBase58(),
            ['depositoryPoolLpTokenVault']: this.depositoryPoolLpTokenVault.toBase58(),
        });
        console.groupEnd();
    }

    public async getOnchainAccount(
        connection: Connection,
        options: ConfirmOptions
    ): Promise<MercurialPoolDepositoryAccount> {
        const coder = new BorshAccountsCoder(IDL);

        const result = await connection.getAccountInfo(
            this.pda,
            options.commitment
        );

        if (!result) {
            throw new Error('mercurialPoolDepository not found');
        }

        return coder.decode('mercurialPoolDepository', result.data);
    }
}
