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
