import { IDL } from '../idl';
import { BorshAccountsCoder } from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey } from '@solana/web3.js';
import { MangoDepositoryAccount } from '../interfaces';

export class MangoDepository {
  public pda: PublicKey;
  public mangoAccountPda: PublicKey;
  public collateralMint: PublicKey;
  public collateralMintSymbol: string;
  public collateralMintDecimals: number;
  public quoteMint: PublicKey;
  public quoteMintSymbol: string;
  public quoteMintDecimals: number;

  public constructor(
    mint: PublicKey,
    mintName: string,
    mintDecimals: number,
    quoteMint: PublicKey,
    quoteMintName: string,
    quoteMintDecimals: number,
    uxdProgramId: PublicKey
  ) {
    this.collateralMint = mint;
    this.collateralMintSymbol = mintName;
    this.collateralMintDecimals = mintDecimals;
    this.quoteMint = quoteMint;
    this.quoteMintSymbol = quoteMintName;
    this.quoteMintDecimals = quoteMintDecimals;
    const mintBuffer = mint.toBuffer();
    [this.pda] = PublicKey.findProgramAddressSync(
      [Buffer.from('MANGODEPOSITORY'), mintBuffer],
      uxdProgramId
    );
    [this.mangoAccountPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('MANGOACCOUNT'), mintBuffer],
      uxdProgramId
    );
  }

  public async getOnchainAccount(
    connection: Connection,
    options: ConfirmOptions
  ): Promise<MangoDepositoryAccount> {
    const coder = new BorshAccountsCoder(IDL);
    const result = await connection.getAccountInfo(
      this.pda,
      options.commitment
    );
    if (!result) {
      throw new Error('mangoDepositoryAccount not found');
    }
    return coder.decode('mangoDepository', result.data);
  }
}
