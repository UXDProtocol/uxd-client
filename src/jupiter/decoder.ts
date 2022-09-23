import { BorshAccountsCoder } from '@project-serum/anchor';
import { PublicKey, AccountInfo } from '@solana/web3.js';
import { BookSide, BookSideLayout, MangoAccount, MangoAccountLayout, MangoCache, MangoCacheLayout, MangoGroup, MangoGroupLayout, PerpMarket, PerpMarketLayout } from '@blockworks-foundation/mango-client';
import { ControllerAccount, MangoDepositoryAccount, IDL } from '../';

export class UxdMangoAccountDecoder {
    protected coder: BorshAccountsCoder;

    constructor() {
        this.coder = new BorshAccountsCoder(IDL);
    }

    public decodeMangoDepositoryAccount(accountInfo: AccountInfo<Buffer>): MangoDepositoryAccount {
        return this.coder.decode('mangoDepository', accountInfo.data);
    }

    public decodeControllerAccount(accountInfo: AccountInfo<Buffer>): ControllerAccount {
        return this.coder.decode('controller', accountInfo.data);
    }

    public decodeMangoAccount(address: PublicKey, accountInfo: AccountInfo<Buffer>): MangoAccount {
        return new MangoAccount(
            address,
            MangoAccountLayout.decode(accountInfo.data),
        );
    }

    public decodeMangoGroup(address: PublicKey, accountInfo: AccountInfo<Buffer>): MangoGroup {
        return new MangoGroup(
            address,
            MangoGroupLayout.decode(accountInfo.data),
        );
    }

    public decodeMangoPerpMarket(address: PublicKey, baseDecimals: number, quoteDecimals: number, accountInfo: AccountInfo<Buffer>): PerpMarket {
        return new PerpMarket(
            address,
            baseDecimals,
            quoteDecimals,
            PerpMarketLayout.decode(accountInfo.data),
        );
    }

    public decodeMangoBookSide(
        address: PublicKey,
        perpMarket: PerpMarket,
        accountInfo: AccountInfo<Buffer>,
        includeExpired?: boolean,
        maxBookDelay?: number
    ): BookSide {
        return new BookSide(
            address,
            perpMarket,
            BookSideLayout.decode(accountInfo.data),
            includeExpired,
            maxBookDelay
        );
    }

    public decodeMangoCache(address: PublicKey, accountInfo: AccountInfo<Buffer>): MangoCache {
        return new MangoCache(address, MangoCacheLayout.decode(accountInfo.data));
    }
}