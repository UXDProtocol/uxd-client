import {
  BorshAccountsCoder,
  Wallet,
  AnchorProvider,
  Program,
  BN,
} from '@project-serum/anchor';
import { ConfirmOptions, Connection, PublicKey } from '@solana/web3.js';
import { IDL } from '../idl';
import { AlloyxVaultDepositoryAccount } from '../interfaces';
import { getMint } from '@solana/spl-token';
import { findATAAddrSync } from '../utils';
import { IDL as alloyxIDL, AlloyxSolana as AlloyxIDL } from './alloyxIdl';

const ALLOYX_VAULT_DEPOSITORY_NAMESPACE = 'ALLOYX_VAULT_DEPOSITORY';

const ALLOYX_VAULT_INTERNAL_VAULT_INFO_NAMESPACE = 'vault_info';
const ALLOYX_VAULT_INTERNAL_VAULT_COLLATERAL_NAMESPACE = 'usdc_token';
const ALLOYX_VAULT_INTERNAL_VAULT_SHARES_NAMESPACE = 'alloyx_token';
const ALLOYX_VAULT_INTERNAL_VAULT_PASS_NAMESPACE = 'pass';

export class AlloyxVaultDepository {
  public constructor(
    public readonly pda: PublicKey,
    public readonly collateralMint: PublicKey,
    public readonly collateralDecimals: number,
    public readonly collateralSymbol: string,
    public readonly depositoryCollateral: PublicKey,
    public readonly depositoryShares: PublicKey,
    public readonly alloyxVaultInfo: PublicKey,
    public readonly alloyxVaultCollateral: PublicKey,
    public readonly alloyxVaultShares: PublicKey,
    public readonly alloyxVaultMint: PublicKey,
    public readonly alloyxVaultPass: PublicKey,
    public readonly alloyxProgramId: PublicKey
  ) {}

  public static async initialize({
    connection,
    uxdProgramId,
    collateralMint,
    collateralSymbol,
    alloyxVaultId,
    alloyxProgramId,
  }: {
    connection: Connection;
    uxdProgramId: PublicKey;
    collateralMint: PublicKey;
    collateralSymbol: string;
    alloyxVaultId: string;
    alloyxProgramId: PublicKey;
  }): Promise<AlloyxVaultDepository> {
    // Collateral decimals can be resolved asynchronously
    const collateralDecimalsPromise = this.getCollateralDecimals(
      connection,
      collateralMint
    );

    // First we need to resolve the basic alloyx vault address
    const alloyxVaultInfo = this.findAlloyxVaultInfoAddress(
      alloyxProgramId,
      alloyxVaultId
    );

    // Then derive alloyx internal accounts that depends on the above
    const alloyxVaultCollateral = this.findAlloyxVaultCollateralAddress(
      alloyxVaultInfo,
      alloyxProgramId
    );
    const alloyxVaultShares = this.findAlloyxVaultSharesAddress(
      alloyxVaultCollateral,
      collateralMint
    );

    // Then we can find the depository address
    const depository = this.findDepositoryAddress(
      alloyxVaultInfo,
      collateralMint,
      uxdProgramId
    );
    // Then the alloyx pass which depends on the depository
    const alloyxVaultPass = this.findAlloyxVaultPassAddress(
      alloyxVaultInfo,
      depository,
      alloyxProgramId
    );

    // Then we can read the content of all alloyx accounts on chain
    const alloyxProgram = this.getAlloyxProgram(connection, alloyxProgramId);
    const alloyxVaultInfoAccountPromise = this.getAlloyxVaultInfoAccount(
      alloyxProgram,
      alloyxVaultInfo
    );

    // Wait until we have all the accounts deserialized data before progressing further
    const alloyxVaultInfoAccount = await alloyxVaultInfoAccountPromise;
    const alloyxProgramStateAccount = await alloyxProgramStateAccountPromise;

    // Then we can read all the informations needed from the onchain accounts
    const alloyxVaultMint = alloyxVaultInfoAccount.lpTokenMint;
    const alloyxTreasuryPoolCollateral =
      alloyxVaultInfoAccount.treasuryPoolTokenAccount;

    // Then generate the depository token accounts
    const depositoryCollateral = this.findDepositoryCollateralAddress(
      depository,
      collateralMint
    );
    const depositoryShares = this.findDepositorySharesAddress(
      depository,
      alloyxVaultMint
    );

    // Resolve final informations when all scheduled work is done
    const collateralDecimals = await collateralDecimalsPromise;

    // Done
    return new AlloyxVaultDepository(
      depository,
      collateralMint,
      collateralDecimals,
      collateralSymbol,
      depositoryCollateral,
      depositoryShares,
      alloyxVaultInfo,
      alloyxVaultCollateral,
      alloyxVaultShares,
      alloyxVaultMint,
      alloyxVaultPass,
      alloyxProgramId
    );
  }

  private static findDepositoryAddress(
    alloyxVaultInfo: PublicKey,
    collateralMint: PublicKey,
    uxdProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from(ALLOYX_VAULT_DEPOSITORY_NAMESPACE),
        alloyxVaultInfo.toBuffer(),
        collateralMint.toBuffer(),
      ],
      uxdProgramId
    )[0];
  }

  private static findDepositoryCollateralAddress(
    depository: PublicKey,
    collateralMint: PublicKey
  ): PublicKey {
    return findATAAddrSync(depository, collateralMint)[0];
  }

  private static findDepositorySharesAddress(
    depository: PublicKey,
    alloyxVaultMint: PublicKey
  ): PublicKey {
    return findATAAddrSync(depository, alloyxVaultMint)[0];
  }

  private static findAlloyxVaultInfoAddress(
    alloyxVaultId: string,
    alloyxProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from(alloyxVaultId),
        Buffer.from(ALLOYX_VAULT_INTERNAL_VAULT_INFO_NAMESPACE),
      ],
      alloyxProgramId
    )[0];
  }

  private static findAlloyxVaultCollateralAddress(
    alloyxVaultId: string,
    alloyxProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from(alloyxVaultId),
        Buffer.from(ALLOYX_VAULT_INTERNAL_VAULT_COLLATERAL_NAMESPACE),
      ],
      alloyxProgramId
    )[0];
  }

  private static findAlloyxVaultSharesAddress(
    alloyxVaultId: string,
    alloyxProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from(alloyxVaultId),
        Buffer.from(ALLOYX_VAULT_INTERNAL_VAULT_SHARES_NAMESPACE),
      ],
      alloyxProgramId
    )[0];
  }

  private static findAlloyxVaultPassAddress(
    alloyxVaultId: PublicKey,
    depository: PublicKey,
    alloyxProgramId: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [
        alloyxVaultId.toBuffer(),
        Buffer.from(ALLOYX_VAULT_INTERNAL_VAULT_PASS_NAMESPACE),
        depository.toBuffer(),
      ],
      alloyxProgramId
    )[0];
  }

  public static getAlloyxProgram(
    connection: Connection,
    alloyxProgramId: PublicKey
  ): Program<AlloyxIDL> {
    const provider = new AnchorProvider(
      connection,
      {} as Wallet,
      AnchorProvider.defaultOptions()
    );
    return new Program<AlloyxIDL>(alloyxIDL, alloyxProgramId, provider);
  }

  public static async getAlloyxVaultInfoAccount(
    alloyxProgram: Program<AlloyxIDL>,
    alloyxVaultInfo: PublicKey
  ) {
    const alloyxVaultInfoAccount =
      await alloyxProgram.account.vaultInfo.fetchNullable(alloyxVaultInfo);
    if (!alloyxVaultInfoAccount) {
      throw new Error(
        'Could not read alloyxVaultInfo account: ' + alloyxVaultInfo.toString()
      );
    }
    return alloyxVaultInfoAccount;
  }

  public static async getAlloyxVaultPassAccount(
    alloyxProgram: Program<AlloyxIDL>,
    alloyxVaultPass: PublicKey
  ) {
    const alloyxVaultPassAccount =
      await alloyxProgram.account.passInfo.fetchNullable(alloyxVaultPass);
    if (!alloyxVaultPassAccount) {
      throw new Error(
        'Could not read alloyxVaultPass account: ' + alloyxVaultPass.toString()
      );
    }
    return alloyxVaultPassAccount;
  }

  public static async getCollateralDecimals(
    connection: Connection,
    collateralMint: PublicKey
  ): Promise<number> {
    const collateralMintData = await getMint(connection, collateralMint);
    if (!collateralMintData) {
      throw new Error(
        'Could not read collateralMint account: ' + collateralMint.toString()
      );
    }
    return collateralMintData.decimals;
  }

  public info() {
    console.groupCollapsed('[Alloyx Vault Depository debug info]');
    console.table({
      pda: this.pda.toBase58(),
      collateralMint: this.collateralMint.toBase58(),
      collateralDecimals: this.collateralDecimals,
      collateralSymbol: this.collateralSymbol,
      depositoryCollateral: this.depositoryCollateral.toBase58(),
      depositoryShares: this.depositoryShares.toBase58(),
      alloyxVaultInfo: this.alloyxVaultInfo.toBase58(),
      alloyxVaultCollateral: this.alloyxVaultCollateral.toBase58(),
      alloyxVaultShares: this.alloyxVaultShares.toBase58(),
      alloyxVaultMint: this.alloyxVaultMint.toBase58(),
      alloyxVaultPass: this.alloyxVaultPass.toBase58(),
      alloyxProgramId: this.alloyxProgramId.toBase58(),
    });
    console.groupEnd();
  }

  public async getOnchainAccount(
    connection: Connection,
    options: ConfirmOptions
  ): Promise<AlloyxVaultDepositoryAccount> {
    const coder = new BorshAccountsCoder(IDL);
    const result = await connection.getAccountInfo(
      this.pda,
      options.commitment
    );
    if (!result) {
      throw new Error('alloyxVaultDepository not found');
    }
    return coder.decode('alloyxVaultDepository', result.data);
  }
}
