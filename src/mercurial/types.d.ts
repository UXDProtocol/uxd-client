import {
    Vault as MercurialVaultIDL,
} from './vaultIdl';
import {
    IdlTypes,
    TypeDef,
} from '@project-serum/anchor/dist/cjs/program/namespace/types';

// HELPER FUNCTIONS COPY PASTED FROM MERCURIAL VAULT NPM PACKAGE
// WE DO NOT WANT TO INCLUDE THE WHOLE MERCURIAL VAULT NPM PACKAGE
// DUE TO DEPENDENCIES ISSUES
export interface ParsedClockState {
    info: {
        epoch: number;
        epochStartTimestamp: number;
        leaderScheduleEpoch: number;
        slot: number;
        unixTimestamp: number;
    };
    type: string;
    program: string;
    space: number;
}

export type VaultState = TypeDef<
    MercurialVaultIDL['accounts']['0'],
    IdlTypes<MercurialVaultIDL>
>;