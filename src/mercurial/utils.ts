import {
  Connection,
  ParsedAccountData,
  SYSVAR_CLOCK_PUBKEY,
} from '@solana/web3.js';
import BN from 'bn.js';
import { ParsedClockState, VaultState } from './types';

export const LOCKED_PROFIT_DEGRADATION_DENOMINATOR = new BN(1_000_000_000_000);

export const getOnchainTime = async (connection: Connection) => {
  const parsedClock = await connection.getParsedAccountInfo(
    SYSVAR_CLOCK_PUBKEY
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const parsedClockAccount = (parsedClock.value!.data as ParsedAccountData)
    .parsed as ParsedClockState;

  const currentTime = parsedClockAccount.info.unixTimestamp;
  return currentTime;
};

export function getAmountByShare(
  share: BN,
  withdrawableAmount: BN,
  totalSupply: BN
): BN {
  if (totalSupply.isZero()) {
    return new BN(0);
  }
  return share.mul(withdrawableAmount).div(totalSupply);
}

export function calculateWithdrawableAmount(
  onChainTime: number,
  vaultState: VaultState
) {
  const {
    lockedProfitTracker: {
      lastReport,
      lockedProfitDegradation,
      lastUpdatedLockedProfit,
    },
    totalAmount: vaultTotalAmount,
  } = vaultState;

  const duration = new BN(onChainTime).sub(lastReport);

  const lockedFundRatio = duration.mul(lockedProfitDegradation);
  if (lockedFundRatio.gt(LOCKED_PROFIT_DEGRADATION_DENOMINATOR)) {
    return vaultTotalAmount;
  }

  const lockedProfit = lastUpdatedLockedProfit
    .mul(LOCKED_PROFIT_DEGRADATION_DENOMINATOR.sub(lockedFundRatio))
    .div(LOCKED_PROFIT_DEGRADATION_DENOMINATOR);

  return vaultTotalAmount.sub(lockedProfit);
}
