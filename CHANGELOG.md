# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Add `01` folder with ZeroOne protocol related code similar to what is done with MangoMarkets
- BREAKING: Some transaction creation instructions now return a promise instead
- BREAKING: Upgrade anchor to `0.24.2` (from `0.22.0`)
- Add methods to retrieve Pnl for borrow/deposit/funding from Mango Stats in MangoDepository
- BREAKING: Remove Rent/Associated program, all accounts must be init before passed to instructions now, no more init if needed.

## [6.0.0] - 2022-04-25

- Open sourcing - tabula rasa
