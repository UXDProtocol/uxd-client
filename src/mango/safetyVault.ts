import {
  I80F48,
  MangoAccount,
  nativeI80F48ToUi,
  nativeToUi,
  Payer,
  PerpMarket,
  PerpMarketConfig,
} from '@blockworks-foundation/mango-client';
import { BorshAccountsCoder } from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey } from '@solana/web3.js';
import { Mango } from '.';
import { UXD_DECIMALS } from '../utils';
import { IDL } from '../idl';
import { MangoDepositoryAccount, SafetyVaultAccount } from '../interfaces';
import { MangoDepository } from './depository';

export class SafetyVault {
  public pda: PublicKey;
  public quoteVaultPda: PublicKey;
  public collateralVaultPda: PublicKey;

  public constructor(depository: MangoDepository, uxdProgramId: PublicKey) {
    [this.pda] = PublicKey.findProgramAddressSync(
      [Buffer.from('SAFETYVAULT'), depository.pda.toBuffer()],
      uxdProgramId
    );
    [this.quoteVaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('QUOTEVAULT'), this.pda.toBuffer()],
      uxdProgramId
    );
    [this.collateralVaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('COLLATERALVAULT'), this.pda.toBuffer()],
      uxdProgramId
    );
  }

  public async getOnchainAccount(
    connection: Connection,
    options: ConfirmOptions
  ): Promise<SafetyVaultAccount> {
    const coder = new BorshAccountsCoder(IDL);
    const result = await connection.getAccountInfo(
      this.pda,
      options.commitment
    );
    if (!result) {
      throw new Error('safetyVaultAccount not found');
    }
    return coder.decode('safetyVault', result.data);
  }
}
