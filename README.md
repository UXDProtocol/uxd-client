# JavaScript (TypeScript) Client for the UXD Solana Program

## Install

```
npm install --save @uxd-protocol/uxd-client
```

## Usage

### About UXD on Solana

#### Mainnet-Beta

- UXD Program: _UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr_
- UXD Mint: _7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT_

#### Devnet

- UXD Program: _BA67esrWE7cPzQWtAftaTbrVWtmHZJ1PbbBBpZgpjH4p_
- UXD Mint: _B8fvu55oqVmPzRFjo99wvnPXkuA2AcFBou5tstpeHFaR_

#### Instantiate the Controller

```javascript
import { Controller } from '@uxd-protocol/uxd-client';

const controller = new Controller(
  'UXD',
  6
  'UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr'
);
```

### Instantiate a Solana Connection

```javascript
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');
```

### Create and initialize the Mango object

```javascript
import { createAndInitializeMango } from '@uxd-protocol/uxd-client';

const mango = createAndInitializeMango(
  connection,
  'mainnet' // 'devnet'
);
```

### Instantiate a MangoDepository for a given UXD collateral, ie WSOL

```javascript
import {
  WSOL,
  SOL_DECIMALS,
  USDC,
  USDC_DECIMALS,
  MangoDepository,
} from '@uxd-protocol/uxd-client';

return new MangoDepository(
  WSOL,
  'SOL',
  SOL_DECIMALS,
  USDC,
  'USDC',
  USDC_DECIMALS,
  'UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr'
);
```

### Instantiate the UXD Client

```javascript
import { UXDClient } from '@uxd-protocol/uxd-client';

const client = new UXDClient('UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr');
```

### Mint 1 SOL worth of UXD on the SOL Mango Depository

```javascript
import { Transaction } from '@solana/web3.js';

const transaction = new Transaction();
const mintWithMangoDepositoryIx =
  client.createMintWithMangoDepositoryInstruction(
    1, // UI amount of collateral to mint
    5, // 0.5% slippage in points
    controller,
    depository, // matching Mango Depository for the collateral
    mango,
    user // PublicKey of recipient
    {}, // ConfirmOptions, leave empty for defaults
    payer, // PublicKey of payer, optional, defaults to user
  );

transaction.add(mintWithMangoDepositoryIx);

// sign, send & confirm transaction
```

### Redeem UXD on the SOL Mango Depository

```javascript
import { Transaction } from '@solana/web3.js';

const transaction = new Transaction();
const redeemFromMangoDepositoryIx =
  client.createRedeemFromMangoDepositoryInstruction(
    1, // UI amount of collateral to redeem
    5, // 0.5% slippage in points
    controller,
    depository, // matching Mango Depository for the collateral
    mango,
    user // PublicKey of recipient
    {}, // ConfirmOptions, leave empty for defaults
    payer, // PublicKey of payer, optional, defaults to user
  );

transaction.add(redeemFromMangoDepositoryIx)

// sign, send & confirm transaction
```
