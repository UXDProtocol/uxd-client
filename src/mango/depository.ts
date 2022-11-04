import { PublicKey } from '@solana/web3.js';

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
}
