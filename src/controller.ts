import { BorshAccountsCoder } from '@project-serum/anchor';
import {
  ConfirmOptions,
  Connection,
  PublicKey,
  TokenAmount,
} from '@solana/web3.js';
import { findAddrSync } from './utils';
import { IDL } from './idl';
import { ControllerAccount } from './interfaces';

export class Controller {
  public pda: PublicKey;
  public redeemableMintPda: PublicKey;
  public redeemableMintDecimals: number;
  public redeemableMintSymbol: string;

  public constructor(
    mintSymbol: string,
    mintDecimals: number,
    uxdProgramId: PublicKey
  ) {
    this.redeemableMintDecimals = mintDecimals;
    this.redeemableMintSymbol = mintSymbol;
    [this.pda] = findAddrSync([Buffer.from('CONTROLLER')], uxdProgramId);
    [this.redeemableMintPda] = findAddrSync(
      [Buffer.from('REDEEMABLE')],
      uxdProgramId
    );
  }

  public info() {
    console.groupCollapsed('[Controller Entity debug info]');
    console.table({
      ['pda']: this.pda.toString(),
      ['redeemableMintPda']: this.redeemableMintPda.toString(),
      ['redeemableMintDecimals']: this.redeemableMintDecimals,
      ['redeemableMintSymbol']: this.redeemableMintSymbol,
    });
    console.groupEnd();
  }

  // MARK: - Public -----------------------------------------------------------

  public async getOnchainAccount(
    connection: Connection,
    options: ConfirmOptions
  ): Promise<ControllerAccount> {
    const coder = new BorshAccountsCoder(IDL);
    const result = await connection.getAccountInfo(
      this.pda,
      options.commitment
    );
    if (!result) {
      throw new Error('controllerAccount not found');
    }
    return coder.decode('controller', result.data);
  }

  public async getRedeemableMintCirculatingSupply(
    connection: Connection,
    options: ConfirmOptions
  ): Promise<number> {
    const amount: TokenAmount = (
      await connection.getTokenSupply(
        this.redeemableMintPda,
        options.commitment
      )
    ).value;
    if (!amount.uiAmount) {
      throw new Error('amount not found');
    }
    return amount.uiAmount;
  }
}
