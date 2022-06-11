import { MarinadeConfig } from '@marinade.finance/marinade-ts-sdk';
import { Connection, PublicKey } from '@solana/web3.js';

export function createMarinadeConfig(
  connection: Connection,
  user: PublicKey
): MarinadeConfig {
  const marinadeConfig = new MarinadeConfig({
    connection: connection,
    publicKey: user,
  });
  return marinadeConfig;
}
