[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/@uxd-protocol/uxd-client.svg
[npm-url]: https://www.npmjs.com/package/@uxd-protocol/uxd-client

# JavaScript Client for the UXD Solana Program

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

const mainnetProgramId = new PublicKey('UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr');

const controller = new Controller(
  'UXD',
  6,
  mainnetProgramId
);
```

### Instantiate a Solana Connection

```javascript
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');
```

### Instantiate the UXD Client

```javascript
import { UXDClient } from '@uxd-protocol/uxd-client';

const mainnetProgramId = new PublicKey('UXD8m9cvwk4RcSxnX2HZ9VudQCEeDH6fRnB4CAP57Dr');

const client = new UXDClient(mainnetProgramId);
```

## Available Instructions

### Public instructions

All public instructions are permissionless, anyone can use them at any point in time.
Note that appart from mint/redeem, all other instructions do not have any parameter, and simply trigger a periodic maintainance action needed by the program.

- `mint` (User can deposit USDC and receive UXD in exchange)
- `redeem` (User can return UXD and receive USDC in exchange)
- `collect_profits_of_mercurial_vault_depository` (Buyback UXP using profits)
- `collect_profits_of_credix_lp_depository` (Buyback UXP using profits)
- `rebalance_create_withdraw_request_from_credix_lp_depository` (automatic credix rebalance, step1)
- `rebalance_redeem_withdraw_request_from_credix_lp_depository` (automatic credix rebalance, step2)

### Instructions reserved for DAO governance

Those instructions are internal instructions usable only by the UXP governance.
They will be used to configure and initialize the on-chain program states.
Each instruction require the DAO's authority to sign the transaction.

#### Controller (program's root state)

- `initialize_controller`
- `edit_controller`
- `freeze_program`

#### Identity depository (hold USDC)

- `edit_identity_depository`
- `initialize_identity_depository`
- `mint_with_identity_depository`
- `redeem_from_identity_depository`

#### Mercurial vault depository (liquid on-chain investment)

- `register_mercurial_vault_depository`
- `edit_mercurial_vault_depository`
- `mint_with_mercurial_vault_depository`
- `redeem_from_mercurial_vault_depository`

#### Credix lp depository (semi-liquid lending)

- `register_credix_lp_depository`
- `edit_credix_lp_depository`
- `mint_with_credix_lp_depository`
- `redeem_from_credix_lp_depository`

