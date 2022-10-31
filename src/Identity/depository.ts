import { BorshAccountsCoder } from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey } from '@solana/web3.js';
import { IDL } from '../idl';
import { IdentityDepositoryAccount } from '../interfaces';

export class IdentityDepository {
    public pda: PublicKey;
    public collateralMint: PublicKey;
    public collateralMintSymbol: string;
    public collateralMintDecimals: number;
    public collateralVaultPda: PublicKey;

    public constructor(
        mint: PublicKey,
        mintName: string,
        mintDecimals: number,
        uxdProgramId: PublicKey
    ) {
        this.collateralMint = mint;
        this.collateralMintSymbol = mintName;
        this.collateralMintDecimals = mintDecimals;
        [this.pda] = PublicKey.findProgramAddressSync(
            [Buffer.from('IDENTITYDEPOSITORY')],
            uxdProgramId
        );
        [this.collateralVaultPda] = PublicKey.findProgramAddressSync(
            [Buffer.from('IDENTITYDEPOSITORYCOLLATERALVAULT')],
            uxdProgramId
        );
    }

    public info() {
        console.groupCollapsed(
            '[Mango Depository debug info - Collateral mint:',
            this.collateralMintSymbol,
            ' - decimals',
            this.collateralMintDecimals,
            ']'
        );
        console.table({
            ['pda']: this.pda.toString(),
            ['collateralMint']: this.collateralMint.toString(),
            ['collateralMintSymbol']: this.collateralMintSymbol.toString(),
            ['collateralMintDecimals']: this.collateralMintDecimals.toString(),
            ['collateralVaultPda']: this.collateralVaultPda.toString(),
        });
        console.groupEnd();
    }


    // MARK: - Public -----------------------------------------------------------

    public async getOnchainAccount(
        connection: Connection,
        options: ConfirmOptions
    ): Promise<IdentityDepositoryAccount> {
        const coder = new BorshAccountsCoder(IDL);
        const result = await connection.getAccountInfo(
            this.pda,
            options.commitment
        );
        if (!result) {
            throw new Error('IdentityDepositoryAccount not found');
        }
        return coder.decode('identityDepository', result.data);
    }
}
