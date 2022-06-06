import { PublicKey } from '@solana/web3.js';

export class MsolConfig {
  public pda: PublicKey;
  public constructor(
    mangoDepositorySOLPda: PublicKey,
    uxdProgramId: PublicKey
  ) {
    [this.pda] = PublicKey.findProgramAddressSync(
      [Buffer.from('MSOLCONFIG'), mangoDepositorySOLPda.toBuffer()],
      uxdProgramId
    );
  }
}
