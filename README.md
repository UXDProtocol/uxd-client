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

#### Instantiate the Controller Object

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

### Instantiate a MangoDepository Object for a given UXD collateral, ie WSOL

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
  USDC, // Use mainnet mint, must be matching the program used (see USDC_DEVNET)
  'USDC',
  USDC_DECIMALS, 
  'UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr' // Mainnet program
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
    1, // UI amount of collateral to use to mint UXD
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
    10, // UI amount of UXD to redeem (returned as the provided depository Collateral, here SOL))
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

### Rebalance an UXD Mango Depository

This can be used as a Swap. Depending of the polarity of the PnL of the depository, this instruction
will switch Quote->Collateral or Collateral->Quote.

For instance, when the PnL is Positive (Collateral price went up since minting), user can provide USDC.
By doing so, UXDProgram will offset the PnL of an equal amount, close equivalent short position, and return the backing collateral amount.

It's a 4bps + slippage + spread swap (as we use the Perp price for all operations).

You can find detailed information about the current state of depositories on the following page
<https://uxd-backoffice.vercel.app/>

```javascript
import { Transaction } from '@solana/web3.js';

const unrealizedPnl = await depository.getUnrealizedPnl(mango, TXN_OPTS);
const polarity = unrealizedPnl > 0 ? PnLPolarity.Positive : PnLPolarity.Negative;

const transaction = new Transaction();
const rebalanceLiteMangoDepositoryIx =
  client.createRebalanceMangoDepositoryLiteInstruction(
    10, // UI amount in Quote to rebalance (Quote on mango is USDC)
    5, // 0.5% slippage in points
    PnLPolarity.positive, // The polarity of the PnL, the expected direction of the swap (can be enforce program side but here to be explicit)
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
