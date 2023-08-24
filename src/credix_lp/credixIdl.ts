export type Credix = {
  version: '3.11.0';
  name: 'credix';
  instructions: [
    {
      name: 'initializeMarket';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'arg';
                type: 'string';
                path: 'global_market_seed';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          docs: [
            'The alternative is to create an empty SigningAuthority struct that can be passed to Account<>'
          ];
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasury';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'treasuryPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpTokenMint';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'lp-token-mint';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'globalMarketSeed';
          type: 'string';
        },
        {
          name: 'withdrawalFee';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'credixFeePercentage';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'multisig';
          type: {
            option: 'publicKey';
          };
        },
        {
          name: 'managers';
          type: {
            option: {
              vec: 'publicKey';
            };
          };
        },
        {
          name: 'passIssuers';
          type: {
            option: {
              vec: 'publicKey';
            };
          };
        },
        {
          name: 'withdrawEpochRequestSeconds';
          type: 'u32';
        },
        {
          name: 'withdrawEpochRedeemSeconds';
          type: 'u32';
        },
        {
          name: 'withdrawEpochAvailableLiquiditySeconds';
          type: 'u32';
        }
      ];
    },
    {
      name: 'depositFunds';
      accounts: [
        {
          name: 'investor';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'investorTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpTokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'investorLpTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'credixPass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'createDeal';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'borrower';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'borrowerInfo';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'borrower-info';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'BorrowerInfo';
                path: 'borrower_info.num_of_deals';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'credixPass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'maxFundingDuration';
          type: 'u8';
        },
        {
          name: 'dealName';
          type: 'string';
        },
        {
          name: 'arrangementFees';
          type: 'u64';
        },
        {
          name: 'arrangementFeePercentage';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'migrated';
          type: 'bool';
        }
      ];
    },
    {
      name: 'setTranches';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'trancheConfigs';
          type: {
            vec: {
              defined: 'TrancheConfig';
            };
          };
        }
      ];
    },
    {
      name: 'setRepaymentSchedule';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'totalPeriods';
          type: 'u16';
        },
        {
          name: 'offset';
          type: 'u32';
        },
        {
          name: 'repaymentPeriodInputs';
          type: {
            vec: {
              defined: 'RepaymentPeriodInput';
            };
          };
        },
        {
          name: 'startTs';
          type: 'i64';
        },
        {
          name: 'daycountConvention';
          type: {
            defined: 'DaycountConvention';
          };
        },
        {
          name: 'waterfallDefinitions';
          type: {
            vec: {
              defined: 'DistributionWaterfall';
            };
          };
        }
      ];
    },
    {
      name: 'addRepaymentWaterfall';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'waterfallDefinitions';
          type: {
            vec: {
              defined: 'DistributionWaterfall';
            };
          };
        }
      ];
    },
    {
      name: 'openDeal';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        }
      ];
      args: [];
    },
    {
      name: 'activateDeal';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-token-account';
              }
            ];
          };
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'borrower';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'credixPass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'repayDeal';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'borrower';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'borrowerTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasuryPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'credixPass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'dealTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-token-account';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'credixMultisigKey';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'credixMultisigTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'variableInterestRates';
          isMut: false;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'setCollectionAndOffRampAccounts';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'collectionTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'arrangementFeeCollectionAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'arrangement-fee-collection';
              }
            ];
          };
        },
        {
          name: 'arrangementFeeCollectionTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'offRampTokenAccount';
          type: 'publicKey';
        }
      ];
    },
    {
      name: 'returnFundsToBorrower';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'collectionTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'arrangementFeeCollectionTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'arrangementFeeCollectionAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'arrangement-fee-collection';
              }
            ];
          };
        },
        {
          name: 'offRampTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'withdrawFunds';
      accounts: [
        {
          name: 'investor';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'investorLpTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'investorTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'credixMultisigKey';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'credixMultisigTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasuryPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpTokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'credixPass';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'baseWithdrawalAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'createCredixPass';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'passHolder';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'credixPass';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'pass_holder';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'isInvestor';
          type: 'bool';
        },
        {
          name: 'isBorrower';
          type: 'bool';
        },
        {
          name: 'releaseTimestamp';
          type: 'i64';
        },
        {
          name: 'disableWithdrawalFee';
          type: 'bool';
        },
        {
          name: 'bypassWithdrawEpochs';
          type: 'bool';
        },
        {
          name: 'amountCap';
          type: {
            option: 'u64';
          };
        }
      ];
    },
    {
      name: 'updateCredixPass';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'passHolder';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'credixPass';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'pass_holder';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'isActive';
          type: 'bool';
        },
        {
          name: 'isInvestor';
          type: 'bool';
        },
        {
          name: 'isBorrower';
          type: 'bool';
        },
        {
          name: 'releaseTimestamp';
          type: 'i64';
        },
        {
          name: 'disableWithdrawalFee';
          type: 'bool';
        },
        {
          name: 'bypassWithdrawEpochs';
          type: 'bool';
        },
        {
          name: 'amountCap';
          type: {
            option: 'u64';
          };
        }
      ];
    },
    {
      name: 'freezeGlobalMarketState';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        }
      ];
      args: [];
    },
    {
      name: 'thawGlobalMarketState';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        }
      ];
      args: [];
    },
    {
      name: 'updateTokenMetadata';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'metadataPda';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'metadata';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'token_metadata_program';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'mint';
              }
            ];
          };
        },
        {
          name: 'mint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'name';
          type: 'string';
        },
        {
          name: 'symbol';
          type: 'string';
        },
        {
          name: 'uri';
          type: 'string';
        }
      ];
    },
    {
      name: 'createTranchePass';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'passHolder';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tranchePass';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'pass_holder';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-pass';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'trancheIndex';
          type: 'u8';
        }
      ];
    },
    {
      name: 'updateTranchePass';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'tranchePass';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'TranchePass';
                path: 'tranche_pass.investor';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'account';
                type: 'u8';
                account: 'TranchePass';
                path: 'tranche_pass.tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-pass';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'active';
          type: 'bool';
        }
      ];
    },
    {
      name: 'depositTranche';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'investor';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'investorBaseAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-token-account';
              }
            ];
          };
        },
        {
          name: 'trancheTokenMint';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'DealTranches';
                path: 'deal_tranches';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-mint';
              }
            ];
          };
        },
        {
          name: 'investorTrancheTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tranchePass';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-pass';
              }
            ];
          };
        },
        {
          name: 'trancheInfo';
          isMut: true;
          isSigner: false;
          isOptional: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-info';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        },
        {
          name: 'trancheIndex';
          type: 'u8';
        }
      ];
    },
    {
      name: 'withdrawFromDeal';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'borrower';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'dealTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-token-account';
              }
            ];
          };
        },
        {
          name: 'borrowerTokenAccount';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'offRampTokenAccount';
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        {
          name: 'credixPass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'burnTranche';
      accounts: [
        {
          name: 'investor';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'investorBaseAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-token-account';
              }
            ];
          };
        },
        {
          name: 'trancheTokenMint';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'DealTranches';
                path: 'deal_tranches';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-mint';
              }
            ];
          };
        },
        {
          name: 'investorTrancheTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tranchePass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-pass';
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'trancheIndex';
          type: 'u8';
        },
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'withdrawTranche';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'investor';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tranchePass';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-pass';
              }
            ];
          };
        },
        {
          name: 'dealTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-token-account';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'investorBaseAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dealTranches';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'trancheTokenMint';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'DealTranches';
                path: 'deal_tranches';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-mint';
              }
            ];
          };
        },
        {
          name: 'investorTrancheTokenAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trancheInfo';
          isMut: true;
          isSigner: false;
          isOptional: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-info';
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'trancheIndex';
          type: 'u8';
        }
      ];
    },
    {
      name: 'initializeProgramState';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'programState';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'credixMultisigKey';
          type: 'publicKey';
        },
        {
          name: 'credixManagers';
          type: {
            array: ['publicKey', 10];
          };
        }
      ];
    },
    {
      name: 'createManagedBorrower';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'managedBorrower';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'arg';
                type: 'string';
                path: 'borrower_name';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'managed-borrower';
              }
            ];
          };
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'borrowerName';
          type: 'string';
        }
      ];
    },
    {
      name: 'updateGlobalMarketCredixFees';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        }
      ];
      args: [
        {
          name: 'credixFeePercentage';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        }
      ];
    },
    {
      name: 'updateProgramState';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'programState';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        }
      ];
      args: [
        {
          name: 'credixMultisigKey';
          type: {
            option: 'publicKey';
          };
        },
        {
          name: 'credixManagers';
          type: {
            option: {
              array: ['publicKey', 10];
            };
          };
        }
      ];
    },
    {
      name: 'updateGlobalMarketState';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        }
      ];
      args: [
        {
          name: 'treasuryPoolTokenAccount';
          type: {
            option: 'publicKey';
          };
        },
        {
          name: 'withdrawalFee';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'poolSizeLimitPercentage';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'withdrawEpochRequestSeconds';
          type: {
            option: 'u32';
          };
        },
        {
          name: 'withdrawEpochRedeemSeconds';
          type: {
            option: 'u32';
          };
        },
        {
          name: 'withdrawEpochAvailableLiquiditySeconds';
          type: {
            option: 'u32';
          };
        },
        {
          name: 'hasWithdrawEpochs';
          type: {
            option: 'bool';
          };
        }
      ];
    },
    {
      name: 'updateArrangementFee';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        }
      ];
      args: [
        {
          name: 'arrangementFeePercentage';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'arrangementFees';
          type: 'u64';
        },
        {
          name: 'arrangementFeesRepaid';
          type: 'u64';
        },
        {
          name: 'timeLatestArrangementFeesCharged';
          type: 'i64';
        }
      ];
    },
    {
      name: 'updateMarketAdmins';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        }
      ];
      args: [
        {
          name: 'multisig';
          type: {
            option: 'publicKey';
          };
        },
        {
          name: 'managers';
          type: {
            option: {
              vec: 'publicKey';
            };
          };
        },
        {
          name: 'passIssuers';
          type: {
            option: {
              vec: 'publicKey';
            };
          };
        }
      ];
    },
    {
      name: 'createWithdrawEpoch';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'withdrawEpoch';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'withdraw-epoch';
              }
            ];
          };
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'createWithdrawRequest';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'investor';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'credixPass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'withdrawEpoch';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'u32';
                account: 'GlobalMarketState';
                path: 'global_market_state.latest_withdraw_epoch_idx';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'withdraw-epoch';
              }
            ];
          };
        },
        {
          name: 'withdrawRequest';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'account';
                type: 'u32';
                account: 'GlobalMarketState';
                path: 'global_market_state.latest_withdraw_epoch_idx';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'withdraw-request';
              }
            ];
          };
        },
        {
          name: 'investorLpTokenAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lpTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'thawFreezeTokenAccount';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'tokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'mint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'freeze';
          type: 'bool';
        }
      ];
    },
    {
      name: 'repayArrangementFees';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'borrower';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'treasuryPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'borrowerTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'credixMultisigKey';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'credixMultisigTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'arrangementFeeCollectionAuthority';
          isMut: false;
          isSigner: false;
          isOptional: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'arrangement-fee-collection';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'setLockedLiquidity';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'withdrawEpoch';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'u32';
                account: 'GlobalMarketState';
                path: 'global_market_state.latest_withdraw_epoch_idx';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'withdraw-epoch';
              }
            ];
          };
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'redeemWithdrawRequest';
      accounts: [
        {
          name: 'investor';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'withdrawEpoch';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'u32';
                account: 'GlobalMarketState';
                path: 'global_market_state.latest_withdraw_epoch_idx';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'withdraw-epoch';
              }
            ];
          };
        },
        {
          name: 'withdrawRequest';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'account';
                type: 'u32';
                account: 'GlobalMarketState';
                path: 'global_market_state.latest_withdraw_epoch_idx';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'withdraw-request';
              }
            ];
          };
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'investorLpTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'investorTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'credixMultisigKey';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'credixMultisigTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasuryPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpTokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'credixPass';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'activateMigratedDeal';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-token-account';
              }
            ];
          };
        },
        {
          name: 'dealClaims';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-claims';
              }
            ];
          };
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dealLpClaimTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-lp-claim-token-account';
              }
            ];
          };
        },
        {
          name: 'borrower';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'credixPass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'borrower';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'lpTokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'lpClaims';
          type: {
            vec: {
              defined: 'LpClaimConfig';
            };
          };
        },
        {
          name: 'trancheClaims';
          type: {
            vec: {
              defined: 'TrancheClaimConfig';
            };
          };
        }
      ];
    },
    {
      name: 'claimTrancheTokens';
      accounts: [
        {
          name: 'investor';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'dealClaims';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-claims';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'trancheTokenMint';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'DealTranches';
                path: 'deal_tranches';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-mint';
              }
            ];
          };
        },
        {
          name: 'investorTrancheTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tranchePass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'tranche_index';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranche-pass';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'trancheIndex';
          type: 'u8';
        },
        {
          name: 'claimIndex';
          type: 'u32';
        }
      ];
    },
    {
      name: 'claimLpTranche';
      accounts: [
        {
          name: 'investor';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'dealClaims';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-claims';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'lpTokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'investorLpTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dealLpClaimTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-lp-claim-token-account';
              }
            ];
          };
        },
        {
          name: 'credixPass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'investor';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'claimIndex';
          type: 'u32';
        }
      ];
    },
    {
      name: 'adjustRepaymentSchedule';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'newLength';
          type: 'u16';
        },
        {
          name: 'changeIndexFrom';
          type: 'u32';
        },
        {
          name: 'repaymentPeriodInputs';
          type: {
            vec: {
              defined: 'RepaymentPeriodInput';
            };
          };
        }
      ];
    },
    {
      name: 'addCrossChainInvestor';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'crossChainInvestor';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'arg';
                type: 'publicKey';
                path: 'investor_chain_address';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'cross-chain-investor';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'baseTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'redeemerAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'redeemer';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'investorChainAddress';
          type: 'publicKey';
        },
        {
          name: 'chainId';
          type: 'u16';
        }
      ];
    },
    {
      name: 'poolDepositTranche';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dealTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-token-account';
              }
            ];
          };
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'trancheIndex';
          type: 'u16';
        },
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'poolWithdrawTranche';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'baseTokenMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dealTokenAccount';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-token-account';
              }
            ];
          };
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'trancheIndex';
          type: 'u16';
        },
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'depositFromRemote';
      docs: [
        'Remaining accounts are required for this instruction check `WormholeAccounts` to know the address.'
      ];
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'crossChainInvestor';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'CrossChainInvestor';
                path: 'cross_chain_investor.investor_chain_address';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'cross-chain-investor';
              }
            ];
          };
        },
        {
          name: 'baseTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'baseTokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpTokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'wormholeMintAuthorityWrapped';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'mint_signer';
              }
            ];
          };
        },
        {
          name: 'redeemerAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'redeemer';
              }
            ];
          };
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'credixPass';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'CrossChainInvestor';
                path: 'cross_chain_investor';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'nonce';
          type: 'u32';
        }
      ];
    },
    {
      name: 'withdrawFromRemote';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signingAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              }
            ];
          };
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'credixMultisigKey';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'credixMultisigTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasuryPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'crossChainInvestor';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'CrossChainInvestor';
                path: 'cross_chain_investor.investor_chain_address';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'cross-chain-investor';
              }
            ];
          };
        },
        {
          name: 'baseTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'baseTokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpTokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'redeemerAuthority';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'redeemer';
              }
            ];
          };
        },
        {
          name: 'liquidityPoolTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'credixPass';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'CrossChainInvestor';
                path: 'cross_chain_investor';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'credix-pass';
              }
            ];
          };
        },
        {
          name: 'wormholeMessageBase';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'nonce';
          type: 'u32';
        }
      ];
    },
    {
      name: 'updateTrancheNameAndRates';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'marketAdmins';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'admins';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'trancheIndex';
          type: 'u8';
        },
        {
          name: 'name';
          type: {
            option: 'string';
          };
        },
        {
          name: 'interest';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'lateInterestFee';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'interestPerformanceFee';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'latePrincipalFee';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'principalPerformanceFee';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'earlyPrincipalFee';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'membershipFee';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        }
      ];
    },
    {
      name: 'updateTranchesAmountsDue';
      accounts: [
        {
          name: 'owner';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal.borrower';
              },
              {
                kind: 'account';
                type: 'u16';
                account: 'Deal';
                path: 'deal.deal_number';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'deal-info';
              }
            ];
          };
        },
        {
          name: 'globalMarketState';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'repaymentSchedule';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'repayment-schedule';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                account: 'GlobalMarketState';
                path: 'global_market_state';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Deal';
                path: 'deal';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'tranches';
              }
            ];
          };
        },
        {
          name: 'variableInterestRates';
          isMut: false;
          isSigner: false;
          isOptional: true;
        }
      ];
      args: [];
    },
    {
      name: 'migrateDeal';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'deal';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'migrateDealTranches';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'programState';
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'program-state';
              }
            ];
          };
        },
        {
          name: 'dealTranches';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'deserializableDeal';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'borrower';
            type: 'publicKey';
          },
          {
            name: 'amountWithdrawn';
            type: 'u64';
          },
          {
            name: 'goLiveAt';
            type: 'i64';
          },
          {
            name: 'createdAt';
            type: 'i64';
          },
          {
            name: 'maxFundingDuration';
            type: 'u8';
          },
          {
            name: 'dealNumber';
            type: 'u16';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'openedAt';
            type: 'i64';
          },
          {
            name: 'arrangementFees';
            type: 'u64';
          },
          {
            name: 'arrangementFeesRepaid';
            type: 'u64';
          },
          {
            name: 'timeLatestArrangementFeesCharged';
            type: 'i64';
          },
          {
            name: 'migrated';
            type: 'bool';
          },
          {
            name: 'originalGoLiveAt';
            type: 'i64';
          },
          {
            name: 'prevUpdateTs';
            type: {
              option: 'i64';
            };
          },
          {
            name: 'arrangementFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'collectionTokenAccount';
            type: {
              option: 'publicKey';
            };
          },
          {
            name: 'offRampTokenAccount';
            type: {
              option: 'publicKey';
            };
          }
        ];
      };
    },
    {
      name: 'mainnetDealTranches';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'totalTranches';
            type: 'u8';
          },
          {
            name: 'tranches';
            type: {
              vec: {
                defined: 'MainnetDealTranche';
              };
            };
          }
        ];
      };
    },
    {
      name: 'borrowerInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'numOfDeals';
            type: 'u16';
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'credixPass';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'isBorrower';
            type: 'bool';
          },
          {
            name: 'isInvestor';
            type: 'bool';
          },
          {
            name: 'active';
            type: 'bool';
          },
          {
            name: 'releaseTimestamp';
            type: 'i64';
          },
          {
            name: 'user';
            type: 'publicKey';
          },
          {
            name: 'disableWithdrawalFee';
            type: 'bool';
          },
          {
            name: 'bypassWithdrawEpochs';
            type: 'bool';
          },
          {
            name: 'withdrawCap';
            type: {
              option: {
                defined: 'WithdrawCap';
              };
            };
          }
        ];
      };
    },
    {
      name: 'crossChainInvestor';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'chainId';
            type: 'u16';
          },
          {
            name: 'investorChainAddress';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'dealClaims';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'trancheClaims';
            type: {
              vec: {
                defined: 'TrancheClaim';
              };
            };
          },
          {
            name: 'lpClaims';
            type: {
              vec: {
                defined: 'LpClaim';
              };
            };
          }
        ];
      };
    },
    {
      name: 'dealTranches';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'totalTranches';
            type: 'u8';
          },
          {
            name: 'tranches';
            type: {
              vec: {
                defined: 'DealTranche';
              };
            };
          }
        ];
      };
    },
    {
      name: 'deal';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'borrower';
            type: 'publicKey';
          },
          {
            name: 'amountWithdrawn';
            docs: [
              'The principal amount withdrawn from deal token account by borrower'
            ];
            type: 'u64';
          },
          {
            name: 'goLiveAt';
            type: 'i64';
          },
          {
            name: 'createdAt';
            type: 'i64';
          },
          {
            name: 'maxFundingDuration';
            docs: [
              'The number of days after tranche investors can call burn tranches if the deal does not goes live.'
            ];
            type: 'u8';
          },
          {
            name: 'dealNumber';
            type: 'u16';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'openedAt';
            type: 'i64';
          },
          {
            name: 'arrangementFees';
            type: 'u64';
          },
          {
            name: 'arrangementFeesRepaid';
            type: 'u64';
          },
          {
            name: 'timeLatestArrangementFeesCharged';
            docs: [
              'Used to keep track of the year arrangement fee is charged for.'
            ];
            type: 'i64';
          },
          {
            name: 'migrated';
            docs: ['true when we bring off chain deal onchain.'];
            type: 'bool';
          },
          {
            name: 'originalGoLiveAt';
            docs: [
              'When upscaling we store the `go_live_at` timestamp here and reset `go_live_at`.',
              'We do this so the deal is no longer regarded as in progress, requiring a new activation.',
              'Across all upscales, the initial point of activation should always be regarded as the `go_live_at` so we need to be able to restore it.'
            ];
            type: 'i64';
          },
          {
            name: 'prevUpdateTs';
            docs: [
              'The timestamp of the last time the due amounts were updated'
            ];
            type: {
              option: 'i64';
            };
          },
          {
            name: 'arrangementFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'collectionTokenAccount';
            docs: ['It is the associated token account for the deals.'];
            type: {
              option: 'publicKey';
            };
          },
          {
            name: 'offRampTokenAccount';
            type: {
              option: 'publicKey';
            };
          },
          {
            name: 'arrangementFeeCollectionAuthority';
            docs: ['This is the authority of the associated token account.'];
            type: {
              option: 'publicKey';
            };
          }
        ];
      };
    },
    {
      name: 'globalMarketState';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'baseTokenMint';
            type: 'publicKey';
          },
          {
            name: 'lpTokenMint';
            type: 'publicKey';
          },
          {
            name: 'poolOutstandingCredit';
            docs: ['The amount from senior tranche lent'];
            type: 'u64';
          },
          {
            name: 'treasuryPoolTokenAccount';
            type: 'publicKey';
          },
          {
            name: 'signingAuthorityBump';
            type: 'u8';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'credixFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'withdrawalFee';
            docs: ['The fee charged for withdrawals'];
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'frozen';
            type: 'bool';
          },
          {
            name: 'seed';
            type: 'string';
          },
          {
            name: 'poolSizeLimitPercentage';
            docs: [
              'Maximum possible deposit limit in addition the pool outstanding credit',
              'pool_size_limit = pool_outstanding_credit + pool_size_limit_percentage * pool_outstanding_credit'
            ];
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'withdrawEpochRequestSeconds';
            type: 'u32';
          },
          {
            name: 'withdrawEpochRedeemSeconds';
            type: 'u32';
          },
          {
            name: 'withdrawEpochAvailableLiquiditySeconds';
            type: 'u32';
          },
          {
            name: 'latestWithdrawEpochIdx';
            type: 'u32';
          },
          {
            name: 'latestWithdrawEpochEnd';
            type: 'i64';
          },
          {
            name: 'lockedLiquidity';
            type: 'u64';
          },
          {
            name: 'totalRedeemedBaseAmount';
            type: 'u64';
          },
          {
            name: 'hasWithdrawEpochs';
            type: 'bool';
          },
          {
            name: 'redeemAuthorityBump';
            docs: [
              'This is only used for wormhole related token transfer occurs.'
            ];
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'managedBorrower';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'borrowerName';
            type: 'string';
          }
        ];
      };
    },
    {
      name: 'marketAdmins';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'multisig';
            type: 'publicKey';
          },
          {
            name: 'managers';
            type: {
              vec: 'publicKey';
            };
          },
          {
            name: 'passIssuers';
            type: {
              vec: 'publicKey';
            };
          }
        ];
      };
    },
    {
      name: 'programState';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'credixMultisigKey';
            type: 'publicKey';
          },
          {
            name: 'credixManagers';
            type: {
              array: ['publicKey', 10];
            };
          }
        ];
      };
    },
    {
      name: 'repaymentSchedule';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'totalPeriods';
            type: 'u16';
          },
          {
            name: 'startTs';
            type: 'i64';
          },
          {
            name: 'daycountConvention';
            type: {
              defined: 'DaycountConvention';
            };
          },
          {
            name: 'periods';
            type: {
              vec: {
                defined: 'RepaymentPeriod';
              };
            };
          },
          {
            name: 'waterfallDefinitions';
            type: {
              vec: {
                defined: 'DistributionWaterfall';
              };
            };
          }
        ];
      };
    },
    {
      name: 'trancheInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'snapshots';
            type: {
              vec: {
                defined: 'TrancheSnapshot';
              };
            };
          }
        ];
      };
    },
    {
      name: 'tranchePass';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'active';
            type: 'bool';
          },
          {
            name: 'investor';
            type: 'publicKey';
          },
          {
            name: 'deal';
            type: 'publicKey';
          },
          {
            name: 'trancheIndex';
            type: 'u8';
          },
          {
            name: 'deposits';
            docs: ['The legacy deposits are not added to this vec.'];
            type: {
              vec: {
                defined: 'UpscaleDeposits';
              };
            };
          },
          {
            name: 'amountWithdrawn';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'withdrawEpoch';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'goLive';
            type: 'i64';
          },
          {
            name: 'requestSeconds';
            type: 'u32';
          },
          {
            name: 'redeemSeconds';
            type: 'u32';
          },
          {
            name: 'availableLiquiditySeconds';
            type: 'u32';
          },
          {
            name: 'totalRequestedBaseAmount';
            type: 'u64';
          },
          {
            name: 'participatingInvestorsTotalLpAmount';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'withdrawRequest';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'baseAmount';
            type: 'u64';
          },
          {
            name: 'baseAmountWithdrawn';
            type: 'u64';
          },
          {
            name: 'investorTotalLpAmount';
            type: 'u64';
          }
        ];
      };
    }
  ];
  types: [
    {
      name: 'MainnetDealTranche';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'index';
            type: 'u8';
          },
          {
            name: 'amountDeposited';
            type: 'u64';
          },
          {
            name: 'tokenMint';
            type: 'publicKey';
          },
          {
            name: 'maxDepositPercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'earlyWithdrawalPrincipal';
            type: 'bool';
          },
          {
            name: 'optionalAccount';
            type: 'bool';
          },
          {
            name: 'upscaleSize';
            type: 'u64';
          },
          {
            name: 'interestRepaidUntilLastUpscale';
            type: 'u64';
          },
          {
            name: 'fundedByLiquidityPool';
            type: 'bool';
          },
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'tranche';
            type: {
              defined: 'Tranche';
            };
          }
        ];
      };
    },
    {
      name: 'TrancheConfig';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'index';
            type: 'u8';
          },
          {
            name: 'maxDepositPercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'earlyWithdrawalPrincipal';
            type: 'bool';
          },
          {
            name: 'fundedByLiquidityPool';
            type: 'bool';
          },
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'size';
            type: 'u64';
          },
          {
            name: 'interest';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'interestPerformanceFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'principalPerformanceFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'membershipFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'lateInterest';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'latePrincipal';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'earlyPrincipal';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'variableRate';
            type: {
              defined: 'VariableRate';
            };
          }
        ];
      };
    },
    {
      name: 'Collection';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'verified';
            type: 'bool';
          },
          {
            name: 'key';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'Creator';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'address';
            type: 'publicKey';
          },
          {
            name: 'verified';
            type: 'bool';
          },
          {
            name: 'share';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'Uses';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'useMethod';
            type: {
              defined: 'UseMethod';
            };
          },
          {
            name: 'remaining';
            type: 'u64';
          },
          {
            name: 'total';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'DataV2';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'symbol';
            type: 'string';
          },
          {
            name: 'uri';
            type: 'string';
          },
          {
            name: 'sellerFeeBasisPoints';
            type: 'u16';
          },
          {
            name: 'creators';
            type: {
              option: {
                vec: {
                  defined: 'Creator';
                };
              };
            };
          },
          {
            name: 'collection';
            type: {
              option: {
                defined: 'Collection';
              };
            };
          },
          {
            name: 'uses';
            type: {
              option: {
                defined: 'Uses';
              };
            };
          }
        ];
      };
    },
    {
      name: 'WithdrawCap';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amountCap';
            type: 'u64';
          },
          {
            name: 'amountWithdrawn';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'TrancheClaim';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'trancheIndex';
            type: 'u8';
          },
          {
            name: 'claimableAmount';
            type: 'u64';
          },
          {
            name: 'claimedAmount';
            type: 'u64';
          },
          {
            name: 'investor';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'LpClaim';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'claimBaseAmount';
            docs: ['base amount deposited'];
            type: 'u64';
          },
          {
            name: 'claimableLpAmount';
            type: 'u64';
          },
          {
            name: 'claimedLpAmount';
            type: 'u64';
          },
          {
            name: 'investor';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'TrancheClaimConfig';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'trancheIndex';
            type: 'u8';
          },
          {
            name: 'claimableAmount';
            type: 'u64';
          },
          {
            name: 'investor';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'LpClaimConfig';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'claimBaseAmount';
            type: 'u64';
          },
          {
            name: 'investor';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'DealTranche';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'index';
            type: 'u8';
          },
          {
            name: 'amountDeposited';
            type: 'u64';
          },
          {
            name: 'tokenMint';
            type: 'publicKey';
          },
          {
            name: 'maxDepositPercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'earlyWithdrawalPrincipal';
            type: 'bool';
          },
          {
            name: 'optionalAccount';
            type: 'bool';
          },
          {
            name: 'upscaleSize';
            type: 'u64';
          },
          {
            name: 'interestRepaidUntilLastUpscale';
            type: 'u64';
          },
          {
            name: 'fundedByLiquidityPool';
            type: 'bool';
          },
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'tranche';
            type: {
              defined: 'Tranche';
            };
          },
          {
            name: 'variableRate';
            type: {
              defined: 'VariableRate';
            };
          },
          {
            name: 'dataPadding';
            type: {
              array: ['u32', 20];
            };
          }
        ];
      };
    },
    {
      name: 'Tranche';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'size';
            type: 'u64';
          },
          {
            name: 'outstandingPrincipal';
            type: 'u64';
          },
          {
            name: 'rates';
            type: {
              defined: 'TrancheRates';
            };
          },
          {
            name: 'amountsDue';
            type: {
              defined: 'TrancheAmountsDue';
            };
          },
          {
            name: 'amountsRepaid';
            type: {
              defined: 'TrancheAmountsRepaid';
            };
          }
        ];
      };
    },
    {
      name: 'TrancheRates';
      docs: [
        'A collection of percentages used to charge various fees on tranche level'
      ];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'interest';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'lateInterestFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'interestPerformanceFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'latePrincipalFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'principalPerformanceFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'earlyPrincipalFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'membershipFee';
            type: {
              defined: 'Fraction';
            };
          }
        ];
      };
    },
    {
      name: 'TrancheAmountsDue';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'interest';
            type: 'u64';
          },
          {
            name: 'prevInterest';
            type: 'u64';
          },
          {
            name: 'principal';
            type: 'u64';
          },
          {
            name: 'prevPrincipal';
            type: 'u64';
          },
          {
            name: 'lateInterestFee';
            type: 'u64';
          },
          {
            name: 'latePrincipalFee';
            type: 'u64';
          },
          {
            name: 'interestPerformanceFee';
            type: 'u64';
          },
          {
            name: 'principalPerformanceFee';
            type: 'u64';
          },
          {
            name: 'membershipFee';
            type: 'u64';
          },
          {
            name: 'earlyPrincipalFee';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'TrancheAmountsRepaid';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'interestRepaid';
            type: 'u64';
          },
          {
            name: 'interestPerformanceFeeRepaid';
            type: 'u64';
          },
          {
            name: 'principalPerformanceFeeRepaid';
            type: 'u64';
          },
          {
            name: 'latePrincipalFeeRepaid';
            type: 'u64';
          },
          {
            name: 'lateInterestFeeRepaid';
            type: 'u64';
          },
          {
            name: 'membershipFeeRepaid';
            type: 'u64';
          },
          {
            name: 'earlyPrincipalFeeRepaid';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'Fraction';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'numerator';
            type: 'u32';
          },
          {
            name: 'denominator';
            type: 'u32';
          }
        ];
      };
    },
    {
      name: 'RepaymentPeriod';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'waterfallIndex';
            type: 'u64';
          },
          {
            name: 'accrualInDays';
            docs: [
              'Amount of days we should consider accrued in this period.',
              '',
              'This is relevant for fee calculations. The amount is not just the days between this period and the previous period as we take into account a calculation date when determining this amount.',
              'These calculations happen off-chain and we just store the result on-chain.'
            ];
            type: 'u32';
          },
          {
            name: 'principalExpected';
            docs: [
              'If there are principal allocations present in the waterfall of a period, we indicate that it should be a certain amount by setting this number.',
              '',
              "If it's `None`, any amount of principal can be repaid in a period, we also don't incur early fees on the principal repaid."
            ];
            type: {
              option: 'u64';
            };
          },
          {
            name: 'timeFrame';
            docs: ['The time frame within which a period takes place.'];
            type: {
              defined: 'TimeFrame';
            };
          },
          {
            name: 'calculationWaterfallIndex';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'TimeFrame';
      docs: [
        'The time frame within which a period takes place.',
        '',
        'Timestamps are expressed as Unix timestamps at midnight of the relevant day.',
        "We do this because it's more convenient and universal to store timestamps but logic wise we are only concerned about days, not hours, minutes, seconds."
      ];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'start';
            type: 'i64';
          },
          {
            name: 'end';
            type: 'i64';
          }
        ];
      };
    },
    {
      name: 'DistributionWaterfall';
      docs: [
        'Determines how repayments should be allocated in a repayment period.'
      ];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'waterfallType';
            type: {
              defined: 'DistributionWaterfallType';
            };
          },
          {
            name: 'tiers';
            docs: [
              'The order of the tiers determines the order of allocations of a repayment'
            ];
            type: {
              vec: {
                defined: 'WaterfallTier';
              };
            };
          }
        ];
      };
    },
    {
      name: 'WaterfallTier';
      docs: [
        'Represents a single tier in a distribution waterfall.',
        '',
        'If multiple allocations are present in a tier, this means the funds are distributed pro rata across allocations.',
        '',
        'If multiple tranches are present in a tier, this means that the funds per allocation are distributed pro rata across tranches.',
        'An exception might occur if there is a principal allocation.',
        'If there is not enough to fulfill the principal allocation of a tier, the pro-rata distribution changes into a sequential one if slashing is enabled.',
        'In that case, the order of the list determines the seniority of the tranches within it. First in the list is more senior.'
      ];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'trancheIndices';
            type: {
              vec: 'u64';
            };
          },
          {
            name: 'slash';
            docs: [
              'Indicates if we should slash should there be multiple indices present.',
              '',
              'If this is false we distribute pro-rata within this tier.',
              '',
              'If this is true we distribute sequentially within this tier.'
            ];
            type: 'bool';
          },
          {
            name: 'charge';
            docs: [
              'Indicates if we want to charge the allocations in this tier. If not, this tier is only used to help determine the repayment order.'
            ];
            type: 'bool';
          },
          {
            name: 'allocations';
            type: {
              vec: {
                defined: 'RepaymentAllocation';
              };
            };
          }
        ];
      };
    },
    {
      name: 'RepaymentPeriodInput';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'calculationWaterfallIndex';
            type: 'u64';
          },
          {
            name: 'waterfallIndex';
            type: 'u64';
          },
          {
            name: 'accrualInDays';
            type: 'u32';
          },
          {
            name: 'principalExpected';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'timeFrame';
            type: {
              defined: 'TimeFrame';
            };
          }
        ];
      };
    },
    {
      name: 'TrancheSnapshot';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'createdAt';
            type: 'i64';
          },
          {
            name: 'interestRepaid';
            type: 'u64';
          },
          {
            name: 'principalRepaid';
            type: 'u64';
          },
          {
            name: 'size';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'UpscaleDeposits';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'upscaleIndex';
            type: 'u32';
          },
          {
            name: 'amount';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'TransferNativeData';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'nonce';
            type: 'u32';
          },
          {
            name: 'amount';
            type: 'u64';
          },
          {
            name: 'fee';
            type: 'u64';
          },
          {
            name: 'targetAddress';
            type: {
              array: ['u8', 32];
            };
          },
          {
            name: 'targetChain';
            type: 'u16';
          }
        ];
      };
    },
    {
      name: 'TransferWrappedData';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'nonce';
            type: 'u32';
          },
          {
            name: 'amount';
            type: 'u64';
          },
          {
            name: 'fee';
            type: 'u64';
          },
          {
            name: 'targetAddress';
            type: {
              array: ['u8', 32];
            };
          },
          {
            name: 'targetChain';
            type: 'u16';
          }
        ];
      };
    },
    {
      name: 'UseMethod';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'Burn';
          },
          {
            name: 'Multiple';
          },
          {
            name: 'Single';
          }
        ];
      };
    },
    {
      name: 'VariableRate';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'None';
          },
          {
            name: 'SOFR';
          }
        ];
      };
    },
    {
      name: 'DealStatus';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'Pending';
          },
          {
            name: 'Structuring';
          },
          {
            name: 'OpenForFunding';
          },
          {
            name: 'InProgress';
          }
        ];
      };
    },
    {
      name: 'DaycountConvention';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'Act360';
          },
          {
            name: 'Act365';
          }
        ];
      };
    },
    {
      name: 'DistributionWaterfallType';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'Acceleration';
          },
          {
            name: 'Amortization';
          },
          {
            name: 'Revolving';
          }
        ];
      };
    },
    {
      name: 'RepaymentAllocation';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'CompoundingInterest';
          },
          {
            name: 'Interest';
          },
          {
            name: 'Principal';
          },
          {
            name: 'InterestPerformanceFee';
          },
          {
            name: 'PrincipalPerformanceFee';
          },
          {
            name: 'LatePrincipalFee';
          },
          {
            name: 'LateInterestFee';
          },
          {
            name: 'MembershipFee';
          },
          {
            name: 'EarlyPrincipalFee';
          }
        ];
      };
    },
    {
      name: 'WithdrawEpochStatus';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'RequestPhase';
          },
          {
            name: 'RedeemPhase';
          },
          {
            name: 'AvailableLiquidityPhase';
          },
          {
            name: 'Closed';
          }
        ];
      };
    },
    {
      name: 'Instructions';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'Initialize';
          },
          {
            name: 'AttestToken';
          },
          {
            name: 'CompleteNative';
          },
          {
            name: 'CompleteWrapped';
          },
          {
            name: 'TransferWrapped';
          },
          {
            name: 'TransferNative';
          },
          {
            name: 'RegisterChain';
          },
          {
            name: 'CreateWrapped';
          },
          {
            name: 'UpgradeContract';
          },
          {
            name: 'CompleteNativeWithPayload';
          },
          {
            name: 'CompleteWrappedWithPayload';
          },
          {
            name: 'TransferWrappedWithPayload';
          },
          {
            name: 'TransferNativeWithPayload';
          }
        ];
      };
    },
    {
      name: 'PortalError';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'CustomZeroError';
          }
        ];
      };
    }
  ];
  events: [
    {
      name: 'DealCreationEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'borrower';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'dealNumber';
          type: 'u16';
          index: false;
        }
      ];
    },
    {
      name: 'DealActivationEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'tranchesFundedByLpSize';
          type: 'u64';
          index: false;
        }
      ];
    },
    {
      name: 'BurnTrancheTokensEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'trancheIndex';
          type: 'u8';
          index: false;
        },
        {
          name: 'amount';
          type: 'u64';
          index: false;
        },
        {
          name: 'investor';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'CreateCredixPassEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'passHolder';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'pass';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'borrower';
          type: 'bool';
          index: false;
        },
        {
          name: 'investor';
          type: 'bool';
          index: false;
        },
        {
          name: 'releaseTimestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'disableWithdrawalFee';
          type: 'bool';
          index: false;
        }
      ];
    },
    {
      name: 'CreateTranchePassEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'passHolder';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'tranchePass';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'trancheIndex';
          type: 'u8';
          index: false;
        }
      ];
    },
    {
      name: 'DealRepaymentEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'amountRepaid';
          type: 'u64';
          index: false;
        },
        {
          name: 'treasury';
          type: 'u64';
          index: false;
        },
        {
          name: 'poolRepaid';
          type: 'u64';
          index: false;
        }
      ];
    },
    {
      name: 'DepositEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'investor';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'amount';
          type: 'u64';
          index: false;
        },
        {
          name: 'liquidityPoolAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'investorLpTokenAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'lpTokenSupply';
          type: 'u64';
          index: false;
        },
        {
          name: 'globalMarketState';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'globalMarketStateSeed';
          type: 'string';
          index: false;
        }
      ];
    },
    {
      name: 'OpenDealEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'SetTranchesEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'dealTranches';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'SetRepaymentScheduleEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'repaymentSchedule';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'UpdateCredixPassEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'passHolder';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'active';
          type: 'bool';
          index: false;
        },
        {
          name: 'borrower';
          type: 'bool';
          index: false;
        },
        {
          name: 'investor';
          type: 'bool';
          index: false;
        },
        {
          name: 'releaseTimestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'pass';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'disableWithdrawalFee';
          type: 'bool';
          index: false;
        }
      ];
    },
    {
      name: 'FreezeGlobalMarketStateEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'ThawGlobalMarketStateEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'UpdateTranchePassEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'passHolder';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'trancheIndex';
          type: 'u8';
          index: false;
        },
        {
          name: 'active';
          type: 'bool';
          index: false;
        },
        {
          name: 'pass';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'DealWithdrawEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'amount';
          type: 'u64';
          index: false;
        }
      ];
    },
    {
      name: 'WithdrawEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'investor';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'amount';
          type: 'u64';
          index: false;
        },
        {
          name: 'liquidityPoolAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'investorLpTokenAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'lpTokenSupply';
          type: 'u64';
          index: false;
        },
        {
          name: 'treasuryAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'globalMarketState';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'globalMarketStateSeed';
          type: 'string';
          index: false;
        }
      ];
    },
    {
      name: 'WithdrawTrancheEvent';
      fields: [
        {
          name: 'major';
          type: 'u8';
          index: true;
        },
        {
          name: 'minor';
          type: 'u8';
          index: false;
        },
        {
          name: 'patch';
          type: 'u8';
          index: false;
        },
        {
          name: 'timestamp';
          type: 'i64';
          index: false;
        },
        {
          name: 'market';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'deal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'trancheIndex';
          type: 'u8';
          index: false;
        },
        {
          name: 'amount';
          type: 'u64';
          index: false;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'UnauthorizedSigner';
      msg: 'The Signer is not authorized to use this instruction.';
    },
    {
      code: 6001;
      name: 'CredixPassInvalid';
      msg: 'Credix pass is invalid for this request.';
    },
    {
      code: 6002;
      name: 'CredixPassInactive';
      msg: 'Credix pass is inactive at the moment.';
    },
    {
      code: 6003;
      name: 'NotEnoughBaseTokens';
      msg: 'Not enough Base tokens.';
    },
    {
      code: 6004;
      name: 'MarketIsFrozen';
      msg: 'This market is currently frozen. Please try again later.';
    },
    {
      code: 6005;
      name: 'InvalidBorrowerTokenAccount';
      msg: 'Invalid Borrower Token Account.';
    },
    {
      code: 6006;
      name: 'InvalidBorrowerAccount';
      msg: 'Invalid Borrower Account.';
    },
    {
      code: 6007;
      name: 'InvalidInvestorTokenAccount';
      msg: 'Invalid Investor Token Account.';
    },
    {
      code: 6008;
      name: 'InvalidTokenAccountMint';
      msg: 'Invalid mint for Token Account.';
    },
    {
      code: 6009;
      name: 'InvalidMintAccount';
      msg: 'Invalid mint Account.';
    },
    {
      code: 6010;
      name: 'InvalidTreasuryAccount';
      msg: 'Invalid treasury Account for this market.';
    },
    {
      code: 6011;
      name: 'WithdrawalsLocked';
      msg: 'Not yet possible to withdraw funds.';
    },
    {
      code: 6012;
      name: 'InvalidTotalTrancheSize';
      msg: 'Total tranche size should be equal to total expected principal of repayment schedule';
    },
    {
      code: 6013;
      name: 'TotalTrancheReturnsNotOne';
      msg: 'Total tranche returns should be one.';
    },
    {
      code: 6014;
      name: 'InvalidTrancheSizeOrReturns';
      msg: 'A tranche with a size should have a value for its returns and vice versa.';
    },
    {
      code: 6015;
      name: 'InvalidTrancheIndex';
      msg: 'There is no tranche in the deal with the provided index.';
    },
    {
      code: 6016;
      name: 'DealNotOpen';
      msg: 'This deal is not open for funding yet.';
    },
    {
      code: 6017;
      name: 'TranchePassInactive';
      msg: 'Tranche pass is inactive at the moment.';
    },
    {
      code: 6018;
      name: 'InvalidInstructionDepositTranche';
      msg: "Deposit Tranche instruction doesn't exist for senior tranche(index=1).";
    },
    {
      code: 6019;
      name: 'NotEnoughTokens';
      msg: 'Not enough tokens';
    },
    {
      code: 6020;
      name: 'DealNotOpenForActivation';
      msg: 'A deal can only be activated once all tranches(except for tranches funded by pool) have been filled.';
    },
    {
      code: 6021;
      name: 'DealNotInProgress';
      msg: 'Deal not in progress';
    },
    {
      code: 6022;
      name: 'DealNotOpenForFunding';
      msg: 'Deal not open for funding';
    },
    {
      code: 6023;
      name: 'InvalidDealTokenAccount';
      msg: 'Invalid deal token account.';
    },
    {
      code: 6024;
      name: 'DealNotOpenForBurningTranches';
      msg: 'Deal not open for burning tranches';
    },
    {
      code: 6025;
      name: 'InvalidLiquidityPoolTrancheInstruction';
      msg: 'This instruction is invalid for tranche funded by liquidity pool.';
    },
    {
      code: 6026;
      name: 'RepaymentPeriodsMissing';
      msg: 'Repayment periods not fully set';
    },
    {
      code: 6027;
      name: 'DealTrancheWithdrawalClosed';
      msg: 'Deal not open for tranche withdrawal';
    },
    {
      code: 6028;
      name: 'DealNotPending';
      msg: 'Deal is not pending';
    },
    {
      code: 6029;
      name: 'RepaymentPeriodsAlreadySet';
      msg: 'Repayment periods already set';
    },
    {
      code: 6030;
      name: 'TotalPeriodsExceeded';
      msg: 'Total periods exceeded';
    },
    {
      code: 6031;
      name: 'InvalidRepaymentSchedule';
      msg: 'Invalid repayment schedule';
    },
    {
      code: 6032;
      name: 'WrongAmountTrancheConfigs';
      msg: 'Wrong number of tranche configs: expected 10';
    },
    {
      code: 6033;
      name: 'TrancheFunded';
      msg: 'Tranche already funded';
    },
    {
      code: 6034;
      name: 'TransferSafeguard';
      msg: 'Transfer safeguard';
    },
    {
      code: 6035;
      name: 'MaxManagersExceeded';
      msg: 'Too many managers specified. Max: 10';
    },
    {
      code: 6036;
      name: 'MaxPassIssuersExceeded';
      msg: 'Too many pass issuers specified. Max: 5';
    },
    {
      code: 6037;
      name: 'InvalidPassInstructionSigner';
      msg: 'The signer does not have permission to issue passes.';
    },
    {
      code: 6038;
      name: 'BaseDepositLimitExceeded';
      msg: 'The max deposit amount limit reached. Please try again later.';
    },
    {
      code: 6039;
      name: 'DaysInYearPeriodDurationRest';
      msg: 'Days in year is not a multiple of period duration';
    },
    {
      code: 6040;
      name: 'CredixPassNotAuthorized';
      msg: 'The signer is not authorized to call the Withdraw Funds instruction.';
    },
    {
      code: 6041;
      name: 'WithdrawEpochAlreadyRunning';
      msg: 'A withdraw epoch is already running.';
    },
    {
      code: 6042;
      name: 'WithdrawEpochNotInRequestPhase';
      msg: 'Withdraw epoch is in its redeem phase or Available liquidity phase and no new withdraw requests are accepted';
    },
    {
      code: 6043;
      name: 'WithdrawEpochInRequestPhase';
      msg: 'Withdraw epoch is in request phase. Please try again later.';
    },
    {
      code: 6044;
      name: 'WithdrawEpochAlreadyEnded';
      msg: 'Withdraw epoch has already ended. Please create a new one using th create withdraw epoch instruction.';
    },
    {
      code: 6045;
      name: 'MintNotOwnedByCredix';
      msg: 'The passed mint account is not initialized by credix program or does not have a freeze authority.';
    },
    {
      code: 6046;
      name: 'NoLiquidityOrLockedLiquidity';
      msg: 'There is no less liquidity or it is locked for a withdraw epoch.';
    },
    {
      code: 6047;
      name: 'InvalidMigrateDealInstruction';
      msg: 'This instruction is not valid for a migrated deal.';
    },
    {
      code: 6048;
      name: 'PeriodDurationIsZero';
      msg: 'Period duration is zero';
    },
    {
      code: 6049;
      name: 'MigrateDealInstruction';
      msg: 'This instruction is only for migrated deals.';
    },
    {
      code: 6050;
      name: 'DuplicateTrancheClaimsInvestors';
      msg: 'Tranche claim configs 2 or more claims with same investor and tranche index.';
    },
    {
      code: 6051;
      name: 'DuplicateLpClaimsInvestor';
      msg: 'Lp claim configs contains 2 or more claims with same investor.';
    },
    {
      code: 6052;
      name: 'TrancheClaimForSeniorTranche';
      msg: 'Tranche claim data invalid provide tranche claims for senior tranche, Use lp claims instead.';
    },
    {
      code: 6053;
      name: 'TrancheClaimAmountInvalid';
      msg: "Tranche claims base amounts don't add up to the tranche size.";
    },
    {
      code: 6054;
      name: 'DealNotOpenForClaims';
      msg: "This migrated deal hasn't been activated yet. It is not open for claims";
    },
    {
      code: 6055;
      name: 'TrancheClaimIndexOutOfBounds';
      msg: 'The tranche claim index is greater then tranche claims length.';
    },
    {
      code: 6056;
      name: 'TrancheClaimInvalidInvestor';
      msg: 'The tranche claim index provided belongs to other investor.';
    },
    {
      code: 6057;
      name: 'TrancheClaimInvalidIndex';
      msg: 'The tranche claim index provided belongs to other tranche index.';
    },
    {
      code: 6058;
      name: 'LpClaimIndexOutOfBounds';
      msg: 'The tranche claim index is greater then tranche claims length.';
    },
    {
      code: 6059;
      name: 'LpClaimInvestorInvalid';
      msg: 'The lp claim index provided belongs to other investor.';
    },
    {
      code: 6060;
      name: 'ModifyingRepaidPeriods';
      msg: 'Can not modify partially repaid periods.';
    },
    {
      code: 6061;
      name: 'DealPrincipalModified';
      msg: 'Can not modify total principal expected in the repayment schedule.';
    },
    {
      code: 6062;
      name: 'StructuringDealForbidden';
      msg: 'Deal should pending or structuring to (re)set the repayment schedule';
    },
    {
      code: 6063;
      name: 'RepaymentScheduleMissing';
      msg: 'Repayment schedule is required for sell order with tranche token';
    },
    {
      code: 6064;
      name: 'DealMissing';
      msg: 'Deal is required for sell order with tranche token';
    },
    {
      code: 6065;
      name: 'TranchePassMissing';
      msg: 'Tranche Pass is required for sell order with tranche token';
    },
    {
      code: 6066;
      name: 'DealTranchesMissing';
      msg: 'Deal Tranches is required for sell order with tranche token';
    },
    {
      code: 6067;
      name: 'SellerTrancheMissing';
      msg: 'Seller Tranche is required for sell order with tranche token';
    },
    {
      code: 6068;
      name: 'WrongAmountTrancheUpscaleConfigs';
      msg: 'Wrong number upscale of tranche configs: expected 10';
    },
    {
      code: 6069;
      name: 'MissingTrancheInfoAccount';
      msg: 'The instruction expected tranche info account: Found None';
    },
    {
      code: 6070;
      name: 'RepaymentPeriodNotFound';
      msg: 'Repayment period index not found';
    },
    {
      code: 6071;
      name: 'TrancheRepaymentMissing';
      msg: 'Tranche repayments missing, Can not adjusts tranches.';
    },
    {
      code: 6072;
      name: 'InvalidPeriodStartTimestamp';
      msg: 'Start of time frame should not be less than the start of repayment schedule';
    },
    {
      code: 6073;
      name: 'StartNotLessThanEnd';
      msg: 'Start of time frame should be less than the end';
    },
    {
      code: 6074;
      name: 'PeriodsNotContinuous';
      msg: 'End of period should be 1 less than the start of next period';
    },
    {
      code: 6075;
      name: 'WaterfallIndexOutOfBounds';
      msg: 'Waterfall index should be less than the length waterfall definitions';
    },
    {
      code: 6076;
      name: 'InvalidDaysOfAccrual';
      msg: 'Days of accrual should be equal to number of days between the start and end of time frame';
    },
    {
      code: 6077;
      name: 'InvalidSeniorTrancheIndex';
      msg: 'There is no senior tranche in the deal with the provided index.';
    },
    {
      code: 6078;
      name: 'PrincipalAlreadyPartiallyPaidBack';
      msg: 'Principal already paid back, not possible to upscale.';
    },
    {
      code: 6079;
      name: 'DealReceivedEarlyInterestPayments';
      msg: 'Received early interest payments, not possible to upscale.';
    },
    {
      code: 6080;
      name: 'CurrentRepaymentPeriodMissing';
      msg: 'The instruction expected current repayment period: Found None';
    },
    {
      code: 6081;
      name: 'TrancheMissing';
      msg: 'The instruction expected some tranche for given index: Found None';
    },
    {
      code: 6082;
      name: 'RevolvingPhasePrincipal';
      msg: 'No principal should be expected for a period in revolving phase';
    },
    {
      code: 6083;
      name: 'MarketHasNoWithdrawEpochs';
      msg: 'Withdraw epochs are not enabled for this market';
    },
    {
      code: 6084;
      name: 'InvalidTokenTransferPayload';
      msg: 'Token transfer payload id is not 3.';
    },
    {
      code: 6085;
      name: 'PayloadFromAddressDoesNotMatch';
      msg: 'Wormhole from address of token does not match';
    },
    {
      code: 6086;
      name: 'WormholeCPICallResultInvalid';
      msg: 'Wormhole smart contracts are acting as bad actors.';
    },
    {
      code: 6087;
      name: 'InvalidTokenTransferPayloadId';
      msg: 'Token transfer payload id is not 1.';
    },
    {
      code: 6088;
      name: 'PeriodWithRepayment';
      msg: 'Tranche rates can only be updated in period which has not received any repayment';
    },
    {
      code: 6089;
      name: 'OffRampTokenAccountMissing';
      msg: 'Off Ramp Token Account is required to withdraw from the deal';
    },
    {
      code: 6090;
      name: 'InvalidOffRampTokenAccount';
      msg: 'Off Ramp Token Account has to same as set in the deal account';
    },
    {
      code: 6091;
      name: 'BorrowerTokenAccountMissing';
      msg: 'Borrower Token Account is required to withdraw from the deal';
    },
    {
      code: 6092;
      name: 'InvalidCollectionTokenAccount';
      msg: 'Collection Token Account has to be same as set in the deal account';
    },
    {
      code: 6093;
      name: 'CredixPassAmountWithdrawnMissing';
      msg: 'Amount withdrawn is expected to be present in credix pass';
    },
    {
      code: 6094;
      name: 'InvalidArrangementFeeCollectionTokenAccount';
      msg: 'Arrangement Fee Collection Token Account has to same as set in the deal account';
    },
    {
      code: 6095;
      name: 'VariableInterestRateAccountMissing';
      msg: 'Tranches use variable rates but VariableInterestRate account not provided';
    },
    {
      code: 6096;
      name: 'MissingArrangementFeeCollectionAuthority';
      msg: 'Arrangement Fee Collection authority Missing';
    }
  ];
};
export const IDL: Credix = {
  version: '3.11.0',
  name: 'credix',
  instructions: [
    {
      name: 'initializeMarket',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'arg',
                type: 'string',
                path: 'global_market_seed',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          docs: [
            'The alternative is to create an empty SigningAuthority struct that can be passed to Account<>',
          ],
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasury',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treasuryPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpTokenMint',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'lp-token-mint',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'globalMarketSeed',
          type: 'string',
        },
        {
          name: 'withdrawalFee',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'credixFeePercentage',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'multisig',
          type: {
            option: 'publicKey',
          },
        },
        {
          name: 'managers',
          type: {
            option: {
              vec: 'publicKey',
            },
          },
        },
        {
          name: 'passIssuers',
          type: {
            option: {
              vec: 'publicKey',
            },
          },
        },
        {
          name: 'withdrawEpochRequestSeconds',
          type: 'u32',
        },
        {
          name: 'withdrawEpochRedeemSeconds',
          type: 'u32',
        },
        {
          name: 'withdrawEpochAvailableLiquiditySeconds',
          type: 'u32',
        },
      ],
    },
    {
      name: 'depositFunds',
      accounts: [
        {
          name: 'investor',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'investorTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'investorLpTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'credixPass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'createDeal',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'borrower',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'borrowerInfo',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'borrower-info',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'BorrowerInfo',
                path: 'borrower_info.num_of_deals',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'credixPass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'maxFundingDuration',
          type: 'u8',
        },
        {
          name: 'dealName',
          type: 'string',
        },
        {
          name: 'arrangementFees',
          type: 'u64',
        },
        {
          name: 'arrangementFeePercentage',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'migrated',
          type: 'bool',
        },
      ],
    },
    {
      name: 'setTranches',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'trancheConfigs',
          type: {
            vec: {
              defined: 'TrancheConfig',
            },
          },
        },
      ],
    },
    {
      name: 'setRepaymentSchedule',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'totalPeriods',
          type: 'u16',
        },
        {
          name: 'offset',
          type: 'u32',
        },
        {
          name: 'repaymentPeriodInputs',
          type: {
            vec: {
              defined: 'RepaymentPeriodInput',
            },
          },
        },
        {
          name: 'startTs',
          type: 'i64',
        },
        {
          name: 'daycountConvention',
          type: {
            defined: 'DaycountConvention',
          },
        },
        {
          name: 'waterfallDefinitions',
          type: {
            vec: {
              defined: 'DistributionWaterfall',
            },
          },
        },
      ],
    },
    {
      name: 'addRepaymentWaterfall',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'waterfallDefinitions',
          type: {
            vec: {
              defined: 'DistributionWaterfall',
            },
          },
        },
      ],
    },
    {
      name: 'openDeal',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
      ],
      args: [],
    },
    {
      name: 'activateDeal',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-token-account',
              },
            ],
          },
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'borrower',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'credixPass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'repayDeal',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'borrower',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'borrowerTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasuryPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'credixPass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'dealTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-token-account',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'credixMultisigKey',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'credixMultisigTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'variableInterestRates',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'setCollectionAndOffRampAccounts',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'collectionTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'arrangementFeeCollectionAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'arrangement-fee-collection',
              },
            ],
          },
        },
        {
          name: 'arrangementFeeCollectionTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'offRampTokenAccount',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'returnFundsToBorrower',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'collectionTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'arrangementFeeCollectionTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'arrangementFeeCollectionAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'arrangement-fee-collection',
              },
            ],
          },
        },
        {
          name: 'offRampTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'withdrawFunds',
      accounts: [
        {
          name: 'investor',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'investorLpTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'investorTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'credixMultisigKey',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'credixMultisigTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasuryPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'credixPass',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'baseWithdrawalAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'createCredixPass',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'passHolder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'credixPass',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'pass_holder',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'isInvestor',
          type: 'bool',
        },
        {
          name: 'isBorrower',
          type: 'bool',
        },
        {
          name: 'releaseTimestamp',
          type: 'i64',
        },
        {
          name: 'disableWithdrawalFee',
          type: 'bool',
        },
        {
          name: 'bypassWithdrawEpochs',
          type: 'bool',
        },
        {
          name: 'amountCap',
          type: {
            option: 'u64',
          },
        },
      ],
    },
    {
      name: 'updateCredixPass',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'passHolder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'credixPass',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'pass_holder',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'isActive',
          type: 'bool',
        },
        {
          name: 'isInvestor',
          type: 'bool',
        },
        {
          name: 'isBorrower',
          type: 'bool',
        },
        {
          name: 'releaseTimestamp',
          type: 'i64',
        },
        {
          name: 'disableWithdrawalFee',
          type: 'bool',
        },
        {
          name: 'bypassWithdrawEpochs',
          type: 'bool',
        },
        {
          name: 'amountCap',
          type: {
            option: 'u64',
          },
        },
      ],
    },
    {
      name: 'freezeGlobalMarketState',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
      ],
      args: [],
    },
    {
      name: 'thawGlobalMarketState',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
      ],
      args: [],
    },
    {
      name: 'updateTokenMetadata',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'metadataPda',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'metadata',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'token_metadata_program',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'mint',
              },
            ],
          },
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'symbol',
          type: 'string',
        },
        {
          name: 'uri',
          type: 'string',
        },
      ],
    },
    {
      name: 'createTranchePass',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'passHolder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tranchePass',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'pass_holder',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-pass',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'trancheIndex',
          type: 'u8',
        },
      ],
    },
    {
      name: 'updateTranchePass',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'tranchePass',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'TranchePass',
                path: 'tranche_pass.investor',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'account',
                type: 'u8',
                account: 'TranchePass',
                path: 'tranche_pass.tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-pass',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'active',
          type: 'bool',
        },
      ],
    },
    {
      name: 'depositTranche',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'investor',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'investorBaseAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-token-account',
              },
            ],
          },
        },
        {
          name: 'trancheTokenMint',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'DealTranches',
                path: 'deal_tranches',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-mint',
              },
            ],
          },
        },
        {
          name: 'investorTrancheTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tranchePass',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-pass',
              },
            ],
          },
        },
        {
          name: 'trancheInfo',
          isMut: true,
          isSigner: false,
          isOptional: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-info',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'trancheIndex',
          type: 'u8',
        },
      ],
    },
    {
      name: 'withdrawFromDeal',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'borrower',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'dealTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-token-account',
              },
            ],
          },
        },
        {
          name: 'borrowerTokenAccount',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'offRampTokenAccount',
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: 'credixPass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'burnTranche',
      accounts: [
        {
          name: 'investor',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'investorBaseAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-token-account',
              },
            ],
          },
        },
        {
          name: 'trancheTokenMint',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'DealTranches',
                path: 'deal_tranches',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-mint',
              },
            ],
          },
        },
        {
          name: 'investorTrancheTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tranchePass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-pass',
              },
            ],
          },
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'trancheIndex',
          type: 'u8',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'withdrawTranche',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'investor',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tranchePass',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-pass',
              },
            ],
          },
        },
        {
          name: 'dealTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-token-account',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'investorBaseAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dealTranches',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'trancheTokenMint',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'DealTranches',
                path: 'deal_tranches',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-mint',
              },
            ],
          },
        },
        {
          name: 'investorTrancheTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trancheInfo',
          isMut: true,
          isSigner: false,
          isOptional: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-info',
              },
            ],
          },
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'trancheIndex',
          type: 'u8',
        },
      ],
    },
    {
      name: 'initializeProgramState',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'programState',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'credixMultisigKey',
          type: 'publicKey',
        },
        {
          name: 'credixManagers',
          type: {
            array: ['publicKey', 10],
          },
        },
      ],
    },
    {
      name: 'createManagedBorrower',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'managedBorrower',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'arg',
                type: 'string',
                path: 'borrower_name',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'managed-borrower',
              },
            ],
          },
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'borrowerName',
          type: 'string',
        },
      ],
    },
    {
      name: 'updateGlobalMarketCredixFees',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'credixFeePercentage',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
      ],
    },
    {
      name: 'updateProgramState',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'programState',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'credixMultisigKey',
          type: {
            option: 'publicKey',
          },
        },
        {
          name: 'credixManagers',
          type: {
            option: {
              array: ['publicKey', 10],
            },
          },
        },
      ],
    },
    {
      name: 'updateGlobalMarketState',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'treasuryPoolTokenAccount',
          type: {
            option: 'publicKey',
          },
        },
        {
          name: 'withdrawalFee',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'poolSizeLimitPercentage',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'withdrawEpochRequestSeconds',
          type: {
            option: 'u32',
          },
        },
        {
          name: 'withdrawEpochRedeemSeconds',
          type: {
            option: 'u32',
          },
        },
        {
          name: 'withdrawEpochAvailableLiquiditySeconds',
          type: {
            option: 'u32',
          },
        },
        {
          name: 'hasWithdrawEpochs',
          type: {
            option: 'bool',
          },
        },
      ],
    },
    {
      name: 'updateArrangementFee',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'arrangementFeePercentage',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'arrangementFees',
          type: 'u64',
        },
        {
          name: 'arrangementFeesRepaid',
          type: 'u64',
        },
        {
          name: 'timeLatestArrangementFeesCharged',
          type: 'i64',
        },
      ],
    },
    {
      name: 'updateMarketAdmins',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'multisig',
          type: {
            option: 'publicKey',
          },
        },
        {
          name: 'managers',
          type: {
            option: {
              vec: 'publicKey',
            },
          },
        },
        {
          name: 'passIssuers',
          type: {
            option: {
              vec: 'publicKey',
            },
          },
        },
      ],
    },
    {
      name: 'createWithdrawEpoch',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'withdrawEpoch',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'withdraw-epoch',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createWithdrawRequest',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'investor',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'credixPass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'withdrawEpoch',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'u32',
                account: 'GlobalMarketState',
                path: 'global_market_state.latest_withdraw_epoch_idx',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'withdraw-epoch',
              },
            ],
          },
        },
        {
          name: 'withdrawRequest',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'account',
                type: 'u32',
                account: 'GlobalMarketState',
                path: 'global_market_state.latest_withdraw_epoch_idx',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'withdraw-request',
              },
            ],
          },
        },
        {
          name: 'investorLpTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lpTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'thawFreezeTokenAccount',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'tokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'freeze',
          type: 'bool',
        },
      ],
    },
    {
      name: 'repayArrangementFees',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'borrower',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'treasuryPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'borrowerTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'credixMultisigKey',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'credixMultisigTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'arrangementFeeCollectionAuthority',
          isMut: false,
          isSigner: false,
          isOptional: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'arrangement-fee-collection',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'setLockedLiquidity',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'withdrawEpoch',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'u32',
                account: 'GlobalMarketState',
                path: 'global_market_state.latest_withdraw_epoch_idx',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'withdraw-epoch',
              },
            ],
          },
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'redeemWithdrawRequest',
      accounts: [
        {
          name: 'investor',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'withdrawEpoch',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'u32',
                account: 'GlobalMarketState',
                path: 'global_market_state.latest_withdraw_epoch_idx',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'withdraw-epoch',
              },
            ],
          },
        },
        {
          name: 'withdrawRequest',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'account',
                type: 'u32',
                account: 'GlobalMarketState',
                path: 'global_market_state.latest_withdraw_epoch_idx',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'withdraw-request',
              },
            ],
          },
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'investorLpTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'investorTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'credixMultisigKey',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'credixMultisigTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasuryPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'credixPass',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'activateMigratedDeal',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-token-account',
              },
            ],
          },
        },
        {
          name: 'dealClaims',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-claims',
              },
            ],
          },
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dealLpClaimTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-lp-claim-token-account',
              },
            ],
          },
        },
        {
          name: 'borrower',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'credixPass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'borrower',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'lpTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'lpClaims',
          type: {
            vec: {
              defined: 'LpClaimConfig',
            },
          },
        },
        {
          name: 'trancheClaims',
          type: {
            vec: {
              defined: 'TrancheClaimConfig',
            },
          },
        },
      ],
    },
    {
      name: 'claimTrancheTokens',
      accounts: [
        {
          name: 'investor',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'dealClaims',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-claims',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'trancheTokenMint',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'DealTranches',
                path: 'deal_tranches',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-mint',
              },
            ],
          },
        },
        {
          name: 'investorTrancheTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tranchePass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'tranche_index',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranche-pass',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'trancheIndex',
          type: 'u8',
        },
        {
          name: 'claimIndex',
          type: 'u32',
        },
      ],
    },
    {
      name: 'claimLpTranche',
      accounts: [
        {
          name: 'investor',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'dealClaims',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-claims',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'lpTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'investorLpTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dealLpClaimTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-lp-claim-token-account',
              },
            ],
          },
        },
        {
          name: 'credixPass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'investor',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'claimIndex',
          type: 'u32',
        },
      ],
    },
    {
      name: 'adjustRepaymentSchedule',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'newLength',
          type: 'u16',
        },
        {
          name: 'changeIndexFrom',
          type: 'u32',
        },
        {
          name: 'repaymentPeriodInputs',
          type: {
            vec: {
              defined: 'RepaymentPeriodInput',
            },
          },
        },
      ],
    },
    {
      name: 'addCrossChainInvestor',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'crossChainInvestor',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'arg',
                type: 'publicKey',
                path: 'investor_chain_address',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'cross-chain-investor',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'baseTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'redeemerAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'redeemer',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'investorChainAddress',
          type: 'publicKey',
        },
        {
          name: 'chainId',
          type: 'u16',
        },
      ],
    },
    {
      name: 'poolDepositTranche',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dealTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-token-account',
              },
            ],
          },
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'trancheIndex',
          type: 'u16',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'poolWithdrawTranche',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'baseTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dealTokenAccount',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-token-account',
              },
            ],
          },
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'trancheIndex',
          type: 'u16',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'depositFromRemote',
      docs: [
        'Remaining accounts are required for this instruction check `WormholeAccounts` to know the address.',
      ],
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'crossChainInvestor',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'CrossChainInvestor',
                path: 'cross_chain_investor.investor_chain_address',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'cross-chain-investor',
              },
            ],
          },
        },
        {
          name: 'baseTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'baseTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'wormholeMintAuthorityWrapped',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'mint_signer',
              },
            ],
          },
        },
        {
          name: 'redeemerAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'redeemer',
              },
            ],
          },
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'credixPass',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'CrossChainInvestor',
                path: 'cross_chain_investor',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'nonce',
          type: 'u32',
        },
      ],
    },
    {
      name: 'withdrawFromRemote',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signingAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
            ],
          },
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'credixMultisigKey',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'credixMultisigTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasuryPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'crossChainInvestor',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'CrossChainInvestor',
                path: 'cross_chain_investor.investor_chain_address',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'cross-chain-investor',
              },
            ],
          },
        },
        {
          name: 'baseTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'baseTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'redeemerAuthority',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'redeemer',
              },
            ],
          },
        },
        {
          name: 'liquidityPoolTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'credixPass',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'CrossChainInvestor',
                path: 'cross_chain_investor',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'credix-pass',
              },
            ],
          },
        },
        {
          name: 'wormholeMessageBase',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'nonce',
          type: 'u32',
        },
      ],
    },
    {
      name: 'updateTrancheNameAndRates',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'marketAdmins',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'admins',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'trancheIndex',
          type: 'u8',
        },
        {
          name: 'name',
          type: {
            option: 'string',
          },
        },
        {
          name: 'interest',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'lateInterestFee',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'interestPerformanceFee',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'latePrincipalFee',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'principalPerformanceFee',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'earlyPrincipalFee',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'membershipFee',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
      ],
    },
    {
      name: 'updateTranchesAmountsDue',
      accounts: [
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal.borrower',
              },
              {
                kind: 'account',
                type: 'u16',
                account: 'Deal',
                path: 'deal.deal_number',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'deal-info',
              },
            ],
          },
        },
        {
          name: 'globalMarketState',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'repaymentSchedule',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'repayment-schedule',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                account: 'GlobalMarketState',
                path: 'global_market_state',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Deal',
                path: 'deal',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'tranches',
              },
            ],
          },
        },
        {
          name: 'variableInterestRates',
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [],
    },
    {
      name: 'migrateDeal',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'deal',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'migrateDealTranches',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'programState',
          isMut: false,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'program-state',
              },
            ],
          },
        },
        {
          name: 'dealTranches',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'deserializableDeal',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'borrower',
            type: 'publicKey',
          },
          {
            name: 'amountWithdrawn',
            type: 'u64',
          },
          {
            name: 'goLiveAt',
            type: 'i64',
          },
          {
            name: 'createdAt',
            type: 'i64',
          },
          {
            name: 'maxFundingDuration',
            type: 'u8',
          },
          {
            name: 'dealNumber',
            type: 'u16',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'openedAt',
            type: 'i64',
          },
          {
            name: 'arrangementFees',
            type: 'u64',
          },
          {
            name: 'arrangementFeesRepaid',
            type: 'u64',
          },
          {
            name: 'timeLatestArrangementFeesCharged',
            type: 'i64',
          },
          {
            name: 'migrated',
            type: 'bool',
          },
          {
            name: 'originalGoLiveAt',
            type: 'i64',
          },
          {
            name: 'prevUpdateTs',
            type: {
              option: 'i64',
            },
          },
          {
            name: 'arrangementFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'collectionTokenAccount',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'offRampTokenAccount',
            type: {
              option: 'publicKey',
            },
          },
        ],
      },
    },
    {
      name: 'mainnetDealTranches',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'totalTranches',
            type: 'u8',
          },
          {
            name: 'tranches',
            type: {
              vec: {
                defined: 'MainnetDealTranche',
              },
            },
          },
        ],
      },
    },
    {
      name: 'borrowerInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'numOfDeals',
            type: 'u16',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'credixPass',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'isBorrower',
            type: 'bool',
          },
          {
            name: 'isInvestor',
            type: 'bool',
          },
          {
            name: 'active',
            type: 'bool',
          },
          {
            name: 'releaseTimestamp',
            type: 'i64',
          },
          {
            name: 'user',
            type: 'publicKey',
          },
          {
            name: 'disableWithdrawalFee',
            type: 'bool',
          },
          {
            name: 'bypassWithdrawEpochs',
            type: 'bool',
          },
          {
            name: 'withdrawCap',
            type: {
              option: {
                defined: 'WithdrawCap',
              },
            },
          },
        ],
      },
    },
    {
      name: 'crossChainInvestor',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'chainId',
            type: 'u16',
          },
          {
            name: 'investorChainAddress',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'dealClaims',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'trancheClaims',
            type: {
              vec: {
                defined: 'TrancheClaim',
              },
            },
          },
          {
            name: 'lpClaims',
            type: {
              vec: {
                defined: 'LpClaim',
              },
            },
          },
        ],
      },
    },
    {
      name: 'dealTranches',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'totalTranches',
            type: 'u8',
          },
          {
            name: 'tranches',
            type: {
              vec: {
                defined: 'DealTranche',
              },
            },
          },
        ],
      },
    },
    {
      name: 'deal',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'borrower',
            type: 'publicKey',
          },
          {
            name: 'amountWithdrawn',
            docs: [
              'The principal amount withdrawn from deal token account by borrower',
            ],
            type: 'u64',
          },
          {
            name: 'goLiveAt',
            type: 'i64',
          },
          {
            name: 'createdAt',
            type: 'i64',
          },
          {
            name: 'maxFundingDuration',
            docs: [
              'The number of days after tranche investors can call burn tranches if the deal does not goes live.',
            ],
            type: 'u8',
          },
          {
            name: 'dealNumber',
            type: 'u16',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'openedAt',
            type: 'i64',
          },
          {
            name: 'arrangementFees',
            type: 'u64',
          },
          {
            name: 'arrangementFeesRepaid',
            type: 'u64',
          },
          {
            name: 'timeLatestArrangementFeesCharged',
            docs: [
              'Used to keep track of the year arrangement fee is charged for.',
            ],
            type: 'i64',
          },
          {
            name: 'migrated',
            docs: ['true when we bring off chain deal onchain.'],
            type: 'bool',
          },
          {
            name: 'originalGoLiveAt',
            docs: [
              'When upscaling we store the `go_live_at` timestamp here and reset `go_live_at`.',
              'We do this so the deal is no longer regarded as in progress, requiring a new activation.',
              'Across all upscales, the initial point of activation should always be regarded as the `go_live_at` so we need to be able to restore it.',
            ],
            type: 'i64',
          },
          {
            name: 'prevUpdateTs',
            docs: [
              'The timestamp of the last time the due amounts were updated',
            ],
            type: {
              option: 'i64',
            },
          },
          {
            name: 'arrangementFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'collectionTokenAccount',
            docs: ['It is the associated token account for the deals.'],
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'offRampTokenAccount',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'arrangementFeeCollectionAuthority',
            docs: ['This is the authority of the associated token account.'],
            type: {
              option: 'publicKey',
            },
          },
        ],
      },
    },
    {
      name: 'globalMarketState',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'baseTokenMint',
            type: 'publicKey',
          },
          {
            name: 'lpTokenMint',
            type: 'publicKey',
          },
          {
            name: 'poolOutstandingCredit',
            docs: ['The amount from senior tranche lent'],
            type: 'u64',
          },
          {
            name: 'treasuryPoolTokenAccount',
            type: 'publicKey',
          },
          {
            name: 'signingAuthorityBump',
            type: 'u8',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'credixFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'withdrawalFee',
            docs: ['The fee charged for withdrawals'],
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'frozen',
            type: 'bool',
          },
          {
            name: 'seed',
            type: 'string',
          },
          {
            name: 'poolSizeLimitPercentage',
            docs: [
              'Maximum possible deposit limit in addition the pool outstanding credit',
              'pool_size_limit = pool_outstanding_credit + pool_size_limit_percentage * pool_outstanding_credit',
            ],
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'withdrawEpochRequestSeconds',
            type: 'u32',
          },
          {
            name: 'withdrawEpochRedeemSeconds',
            type: 'u32',
          },
          {
            name: 'withdrawEpochAvailableLiquiditySeconds',
            type: 'u32',
          },
          {
            name: 'latestWithdrawEpochIdx',
            type: 'u32',
          },
          {
            name: 'latestWithdrawEpochEnd',
            type: 'i64',
          },
          {
            name: 'lockedLiquidity',
            type: 'u64',
          },
          {
            name: 'totalRedeemedBaseAmount',
            type: 'u64',
          },
          {
            name: 'hasWithdrawEpochs',
            type: 'bool',
          },
          {
            name: 'redeemAuthorityBump',
            docs: [
              'This is only used for wormhole related token transfer occurs.',
            ],
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'managedBorrower',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'borrowerName',
            type: 'string',
          },
        ],
      },
    },
    {
      name: 'marketAdmins',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'multisig',
            type: 'publicKey',
          },
          {
            name: 'managers',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'passIssuers',
            type: {
              vec: 'publicKey',
            },
          },
        ],
      },
    },
    {
      name: 'programState',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'credixMultisigKey',
            type: 'publicKey',
          },
          {
            name: 'credixManagers',
            type: {
              array: ['publicKey', 10],
            },
          },
        ],
      },
    },
    {
      name: 'repaymentSchedule',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'totalPeriods',
            type: 'u16',
          },
          {
            name: 'startTs',
            type: 'i64',
          },
          {
            name: 'daycountConvention',
            type: {
              defined: 'DaycountConvention',
            },
          },
          {
            name: 'periods',
            type: {
              vec: {
                defined: 'RepaymentPeriod',
              },
            },
          },
          {
            name: 'waterfallDefinitions',
            type: {
              vec: {
                defined: 'DistributionWaterfall',
              },
            },
          },
        ],
      },
    },
    {
      name: 'trancheInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'snapshots',
            type: {
              vec: {
                defined: 'TrancheSnapshot',
              },
            },
          },
        ],
      },
    },
    {
      name: 'tranchePass',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'active',
            type: 'bool',
          },
          {
            name: 'investor',
            type: 'publicKey',
          },
          {
            name: 'deal',
            type: 'publicKey',
          },
          {
            name: 'trancheIndex',
            type: 'u8',
          },
          {
            name: 'deposits',
            docs: ['The legacy deposits are not added to this vec.'],
            type: {
              vec: {
                defined: 'UpscaleDeposits',
              },
            },
          },
          {
            name: 'amountWithdrawn',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'withdrawEpoch',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'goLive',
            type: 'i64',
          },
          {
            name: 'requestSeconds',
            type: 'u32',
          },
          {
            name: 'redeemSeconds',
            type: 'u32',
          },
          {
            name: 'availableLiquiditySeconds',
            type: 'u32',
          },
          {
            name: 'totalRequestedBaseAmount',
            type: 'u64',
          },
          {
            name: 'participatingInvestorsTotalLpAmount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'withdrawRequest',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'baseAmount',
            type: 'u64',
          },
          {
            name: 'baseAmountWithdrawn',
            type: 'u64',
          },
          {
            name: 'investorTotalLpAmount',
            type: 'u64',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'MainnetDealTranche',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'index',
            type: 'u8',
          },
          {
            name: 'amountDeposited',
            type: 'u64',
          },
          {
            name: 'tokenMint',
            type: 'publicKey',
          },
          {
            name: 'maxDepositPercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'earlyWithdrawalPrincipal',
            type: 'bool',
          },
          {
            name: 'optionalAccount',
            type: 'bool',
          },
          {
            name: 'upscaleSize',
            type: 'u64',
          },
          {
            name: 'interestRepaidUntilLastUpscale',
            type: 'u64',
          },
          {
            name: 'fundedByLiquidityPool',
            type: 'bool',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'tranche',
            type: {
              defined: 'Tranche',
            },
          },
        ],
      },
    },
    {
      name: 'TrancheConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'index',
            type: 'u8',
          },
          {
            name: 'maxDepositPercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'earlyWithdrawalPrincipal',
            type: 'bool',
          },
          {
            name: 'fundedByLiquidityPool',
            type: 'bool',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'size',
            type: 'u64',
          },
          {
            name: 'interest',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'interestPerformanceFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'principalPerformanceFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'membershipFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'lateInterest',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'latePrincipal',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'earlyPrincipal',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'variableRate',
            type: {
              defined: 'VariableRate',
            },
          },
        ],
      },
    },
    {
      name: 'Collection',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'verified',
            type: 'bool',
          },
          {
            name: 'key',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'Creator',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'address',
            type: 'publicKey',
          },
          {
            name: 'verified',
            type: 'bool',
          },
          {
            name: 'share',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Uses',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'useMethod',
            type: {
              defined: 'UseMethod',
            },
          },
          {
            name: 'remaining',
            type: 'u64',
          },
          {
            name: 'total',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'DataV2',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'sellerFeeBasisPoints',
            type: 'u16',
          },
          {
            name: 'creators',
            type: {
              option: {
                vec: {
                  defined: 'Creator',
                },
              },
            },
          },
          {
            name: 'collection',
            type: {
              option: {
                defined: 'Collection',
              },
            },
          },
          {
            name: 'uses',
            type: {
              option: {
                defined: 'Uses',
              },
            },
          },
        ],
      },
    },
    {
      name: 'WithdrawCap',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amountCap',
            type: 'u64',
          },
          {
            name: 'amountWithdrawn',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'TrancheClaim',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'trancheIndex',
            type: 'u8',
          },
          {
            name: 'claimableAmount',
            type: 'u64',
          },
          {
            name: 'claimedAmount',
            type: 'u64',
          },
          {
            name: 'investor',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'LpClaim',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'claimBaseAmount',
            docs: ['base amount deposited'],
            type: 'u64',
          },
          {
            name: 'claimableLpAmount',
            type: 'u64',
          },
          {
            name: 'claimedLpAmount',
            type: 'u64',
          },
          {
            name: 'investor',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'TrancheClaimConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'trancheIndex',
            type: 'u8',
          },
          {
            name: 'claimableAmount',
            type: 'u64',
          },
          {
            name: 'investor',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'LpClaimConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'claimBaseAmount',
            type: 'u64',
          },
          {
            name: 'investor',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'DealTranche',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'index',
            type: 'u8',
          },
          {
            name: 'amountDeposited',
            type: 'u64',
          },
          {
            name: 'tokenMint',
            type: 'publicKey',
          },
          {
            name: 'maxDepositPercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'earlyWithdrawalPrincipal',
            type: 'bool',
          },
          {
            name: 'optionalAccount',
            type: 'bool',
          },
          {
            name: 'upscaleSize',
            type: 'u64',
          },
          {
            name: 'interestRepaidUntilLastUpscale',
            type: 'u64',
          },
          {
            name: 'fundedByLiquidityPool',
            type: 'bool',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'tranche',
            type: {
              defined: 'Tranche',
            },
          },
          {
            name: 'variableRate',
            type: {
              defined: 'VariableRate',
            },
          },
          {
            name: 'dataPadding',
            type: {
              array: ['u32', 20],
            },
          },
        ],
      },
    },
    {
      name: 'Tranche',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'size',
            type: 'u64',
          },
          {
            name: 'outstandingPrincipal',
            type: 'u64',
          },
          {
            name: 'rates',
            type: {
              defined: 'TrancheRates',
            },
          },
          {
            name: 'amountsDue',
            type: {
              defined: 'TrancheAmountsDue',
            },
          },
          {
            name: 'amountsRepaid',
            type: {
              defined: 'TrancheAmountsRepaid',
            },
          },
        ],
      },
    },
    {
      name: 'TrancheRates',
      docs: [
        'A collection of percentages used to charge various fees on tranche level',
      ],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'interest',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'lateInterestFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'interestPerformanceFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'latePrincipalFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'principalPerformanceFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'earlyPrincipalFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'membershipFee',
            type: {
              defined: 'Fraction',
            },
          },
        ],
      },
    },
    {
      name: 'TrancheAmountsDue',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'interest',
            type: 'u64',
          },
          {
            name: 'prevInterest',
            type: 'u64',
          },
          {
            name: 'principal',
            type: 'u64',
          },
          {
            name: 'prevPrincipal',
            type: 'u64',
          },
          {
            name: 'lateInterestFee',
            type: 'u64',
          },
          {
            name: 'latePrincipalFee',
            type: 'u64',
          },
          {
            name: 'interestPerformanceFee',
            type: 'u64',
          },
          {
            name: 'principalPerformanceFee',
            type: 'u64',
          },
          {
            name: 'membershipFee',
            type: 'u64',
          },
          {
            name: 'earlyPrincipalFee',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'TrancheAmountsRepaid',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'interestRepaid',
            type: 'u64',
          },
          {
            name: 'interestPerformanceFeeRepaid',
            type: 'u64',
          },
          {
            name: 'principalPerformanceFeeRepaid',
            type: 'u64',
          },
          {
            name: 'latePrincipalFeeRepaid',
            type: 'u64',
          },
          {
            name: 'lateInterestFeeRepaid',
            type: 'u64',
          },
          {
            name: 'membershipFeeRepaid',
            type: 'u64',
          },
          {
            name: 'earlyPrincipalFeeRepaid',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'Fraction',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'numerator',
            type: 'u32',
          },
          {
            name: 'denominator',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'RepaymentPeriod',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'waterfallIndex',
            type: 'u64',
          },
          {
            name: 'accrualInDays',
            docs: [
              'Amount of days we should consider accrued in this period.',
              '',
              'This is relevant for fee calculations. The amount is not just the days between this period and the previous period as we take into account a calculation date when determining this amount.',
              'These calculations happen off-chain and we just store the result on-chain.',
            ],
            type: 'u32',
          },
          {
            name: 'principalExpected',
            docs: [
              'If there are principal allocations present in the waterfall of a period, we indicate that it should be a certain amount by setting this number.',
              '',
              "If it's `None`, any amount of principal can be repaid in a period, we also don't incur early fees on the principal repaid.",
            ],
            type: {
              option: 'u64',
            },
          },
          {
            name: 'timeFrame',
            docs: ['The time frame within which a period takes place.'],
            type: {
              defined: 'TimeFrame',
            },
          },
          {
            name: 'calculationWaterfallIndex',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'TimeFrame',
      docs: [
        'The time frame within which a period takes place.',
        '',
        'Timestamps are expressed as Unix timestamps at midnight of the relevant day.',
        "We do this because it's more convenient and universal to store timestamps but logic wise we are only concerned about days, not hours, minutes, seconds.",
      ],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'start',
            type: 'i64',
          },
          {
            name: 'end',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'DistributionWaterfall',
      docs: [
        'Determines how repayments should be allocated in a repayment period.',
      ],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'waterfallType',
            type: {
              defined: 'DistributionWaterfallType',
            },
          },
          {
            name: 'tiers',
            docs: [
              'The order of the tiers determines the order of allocations of a repayment',
            ],
            type: {
              vec: {
                defined: 'WaterfallTier',
              },
            },
          },
        ],
      },
    },
    {
      name: 'WaterfallTier',
      docs: [
        'Represents a single tier in a distribution waterfall.',
        '',
        'If multiple allocations are present in a tier, this means the funds are distributed pro rata across allocations.',
        '',
        'If multiple tranches are present in a tier, this means that the funds per allocation are distributed pro rata across tranches.',
        'An exception might occur if there is a principal allocation.',
        'If there is not enough to fulfill the principal allocation of a tier, the pro-rata distribution changes into a sequential one if slashing is enabled.',
        'In that case, the order of the list determines the seniority of the tranches within it. First in the list is more senior.',
      ],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'trancheIndices',
            type: {
              vec: 'u64',
            },
          },
          {
            name: 'slash',
            docs: [
              'Indicates if we should slash should there be multiple indices present.',
              '',
              'If this is false we distribute pro-rata within this tier.',
              '',
              'If this is true we distribute sequentially within this tier.',
            ],
            type: 'bool',
          },
          {
            name: 'charge',
            docs: [
              'Indicates if we want to charge the allocations in this tier. If not, this tier is only used to help determine the repayment order.',
            ],
            type: 'bool',
          },
          {
            name: 'allocations',
            type: {
              vec: {
                defined: 'RepaymentAllocation',
              },
            },
          },
        ],
      },
    },
    {
      name: 'RepaymentPeriodInput',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'calculationWaterfallIndex',
            type: 'u64',
          },
          {
            name: 'waterfallIndex',
            type: 'u64',
          },
          {
            name: 'accrualInDays',
            type: 'u32',
          },
          {
            name: 'principalExpected',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'timeFrame',
            type: {
              defined: 'TimeFrame',
            },
          },
        ],
      },
    },
    {
      name: 'TrancheSnapshot',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'createdAt',
            type: 'i64',
          },
          {
            name: 'interestRepaid',
            type: 'u64',
          },
          {
            name: 'principalRepaid',
            type: 'u64',
          },
          {
            name: 'size',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'UpscaleDeposits',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'upscaleIndex',
            type: 'u32',
          },
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'TransferNativeData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'nonce',
            type: 'u32',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'fee',
            type: 'u64',
          },
          {
            name: 'targetAddress',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'targetChain',
            type: 'u16',
          },
        ],
      },
    },
    {
      name: 'TransferWrappedData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'nonce',
            type: 'u32',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'fee',
            type: 'u64',
          },
          {
            name: 'targetAddress',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'targetChain',
            type: 'u16',
          },
        ],
      },
    },
    {
      name: 'UseMethod',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Burn',
          },
          {
            name: 'Multiple',
          },
          {
            name: 'Single',
          },
        ],
      },
    },
    {
      name: 'VariableRate',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'None',
          },
          {
            name: 'SOFR',
          },
        ],
      },
    },
    {
      name: 'DealStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Pending',
          },
          {
            name: 'Structuring',
          },
          {
            name: 'OpenForFunding',
          },
          {
            name: 'InProgress',
          },
        ],
      },
    },
    {
      name: 'DaycountConvention',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Act360',
          },
          {
            name: 'Act365',
          },
        ],
      },
    },
    {
      name: 'DistributionWaterfallType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Acceleration',
          },
          {
            name: 'Amortization',
          },
          {
            name: 'Revolving',
          },
        ],
      },
    },
    {
      name: 'RepaymentAllocation',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'CompoundingInterest',
          },
          {
            name: 'Interest',
          },
          {
            name: 'Principal',
          },
          {
            name: 'InterestPerformanceFee',
          },
          {
            name: 'PrincipalPerformanceFee',
          },
          {
            name: 'LatePrincipalFee',
          },
          {
            name: 'LateInterestFee',
          },
          {
            name: 'MembershipFee',
          },
          {
            name: 'EarlyPrincipalFee',
          },
        ],
      },
    },
    {
      name: 'WithdrawEpochStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'RequestPhase',
          },
          {
            name: 'RedeemPhase',
          },
          {
            name: 'AvailableLiquidityPhase',
          },
          {
            name: 'Closed',
          },
        ],
      },
    },
    {
      name: 'Instructions',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Initialize',
          },
          {
            name: 'AttestToken',
          },
          {
            name: 'CompleteNative',
          },
          {
            name: 'CompleteWrapped',
          },
          {
            name: 'TransferWrapped',
          },
          {
            name: 'TransferNative',
          },
          {
            name: 'RegisterChain',
          },
          {
            name: 'CreateWrapped',
          },
          {
            name: 'UpgradeContract',
          },
          {
            name: 'CompleteNativeWithPayload',
          },
          {
            name: 'CompleteWrappedWithPayload',
          },
          {
            name: 'TransferWrappedWithPayload',
          },
          {
            name: 'TransferNativeWithPayload',
          },
        ],
      },
    },
    {
      name: 'PortalError',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'CustomZeroError',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'DealCreationEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'borrower',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'dealNumber',
          type: 'u16',
          index: false,
        },
      ],
    },
    {
      name: 'DealActivationEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'tranchesFundedByLpSize',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'BurnTrancheTokensEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'trancheIndex',
          type: 'u8',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'investor',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'CreateCredixPassEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'passHolder',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'pass',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'borrower',
          type: 'bool',
          index: false,
        },
        {
          name: 'investor',
          type: 'bool',
          index: false,
        },
        {
          name: 'releaseTimestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'disableWithdrawalFee',
          type: 'bool',
          index: false,
        },
      ],
    },
    {
      name: 'CreateTranchePassEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'passHolder',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'tranchePass',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'trancheIndex',
          type: 'u8',
          index: false,
        },
      ],
    },
    {
      name: 'DealRepaymentEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amountRepaid',
          type: 'u64',
          index: false,
        },
        {
          name: 'treasury',
          type: 'u64',
          index: false,
        },
        {
          name: 'poolRepaid',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'DepositEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'investor',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'liquidityPoolAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'investorLpTokenAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'lpTokenSupply',
          type: 'u64',
          index: false,
        },
        {
          name: 'globalMarketState',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'globalMarketStateSeed',
          type: 'string',
          index: false,
        },
      ],
    },
    {
      name: 'OpenDealEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'SetTranchesEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'dealTranches',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'SetRepaymentScheduleEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'repaymentSchedule',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'UpdateCredixPassEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'passHolder',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'active',
          type: 'bool',
          index: false,
        },
        {
          name: 'borrower',
          type: 'bool',
          index: false,
        },
        {
          name: 'investor',
          type: 'bool',
          index: false,
        },
        {
          name: 'releaseTimestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'pass',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'disableWithdrawalFee',
          type: 'bool',
          index: false,
        },
      ],
    },
    {
      name: 'FreezeGlobalMarketStateEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'ThawGlobalMarketStateEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'UpdateTranchePassEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'passHolder',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'trancheIndex',
          type: 'u8',
          index: false,
        },
        {
          name: 'active',
          type: 'bool',
          index: false,
        },
        {
          name: 'pass',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'DealWithdrawEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'WithdrawEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'investor',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'liquidityPoolAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'investorLpTokenAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'lpTokenSupply',
          type: 'u64',
          index: false,
        },
        {
          name: 'treasuryAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'globalMarketState',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'globalMarketStateSeed',
          type: 'string',
          index: false,
        },
      ],
    },
    {
      name: 'WithdrawTrancheEvent',
      fields: [
        {
          name: 'major',
          type: 'u8',
          index: true,
        },
        {
          name: 'minor',
          type: 'u8',
          index: false,
        },
        {
          name: 'patch',
          type: 'u8',
          index: false,
        },
        {
          name: 'timestamp',
          type: 'i64',
          index: false,
        },
        {
          name: 'market',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'deal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'trancheIndex',
          type: 'u8',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'UnauthorizedSigner',
      msg: 'The Signer is not authorized to use this instruction.',
    },
    {
      code: 6001,
      name: 'CredixPassInvalid',
      msg: 'Credix pass is invalid for this request.',
    },
    {
      code: 6002,
      name: 'CredixPassInactive',
      msg: 'Credix pass is inactive at the moment.',
    },
    {
      code: 6003,
      name: 'NotEnoughBaseTokens',
      msg: 'Not enough Base tokens.',
    },
    {
      code: 6004,
      name: 'MarketIsFrozen',
      msg: 'This market is currently frozen. Please try again later.',
    },
    {
      code: 6005,
      name: 'InvalidBorrowerTokenAccount',
      msg: 'Invalid Borrower Token Account.',
    },
    {
      code: 6006,
      name: 'InvalidBorrowerAccount',
      msg: 'Invalid Borrower Account.',
    },
    {
      code: 6007,
      name: 'InvalidInvestorTokenAccount',
      msg: 'Invalid Investor Token Account.',
    },
    {
      code: 6008,
      name: 'InvalidTokenAccountMint',
      msg: 'Invalid mint for Token Account.',
    },
    {
      code: 6009,
      name: 'InvalidMintAccount',
      msg: 'Invalid mint Account.',
    },
    {
      code: 6010,
      name: 'InvalidTreasuryAccount',
      msg: 'Invalid treasury Account for this market.',
    },
    {
      code: 6011,
      name: 'WithdrawalsLocked',
      msg: 'Not yet possible to withdraw funds.',
    },
    {
      code: 6012,
      name: 'InvalidTotalTrancheSize',
      msg: 'Total tranche size should be equal to total expected principal of repayment schedule',
    },
    {
      code: 6013,
      name: 'TotalTrancheReturnsNotOne',
      msg: 'Total tranche returns should be one.',
    },
    {
      code: 6014,
      name: 'InvalidTrancheSizeOrReturns',
      msg: 'A tranche with a size should have a value for its returns and vice versa.',
    },
    {
      code: 6015,
      name: 'InvalidTrancheIndex',
      msg: 'There is no tranche in the deal with the provided index.',
    },
    {
      code: 6016,
      name: 'DealNotOpen',
      msg: 'This deal is not open for funding yet.',
    },
    {
      code: 6017,
      name: 'TranchePassInactive',
      msg: 'Tranche pass is inactive at the moment.',
    },
    {
      code: 6018,
      name: 'InvalidInstructionDepositTranche',
      msg: "Deposit Tranche instruction doesn't exist for senior tranche(index=1).",
    },
    {
      code: 6019,
      name: 'NotEnoughTokens',
      msg: 'Not enough tokens',
    },
    {
      code: 6020,
      name: 'DealNotOpenForActivation',
      msg: 'A deal can only be activated once all tranches(except for tranches funded by pool) have been filled.',
    },
    {
      code: 6021,
      name: 'DealNotInProgress',
      msg: 'Deal not in progress',
    },
    {
      code: 6022,
      name: 'DealNotOpenForFunding',
      msg: 'Deal not open for funding',
    },
    {
      code: 6023,
      name: 'InvalidDealTokenAccount',
      msg: 'Invalid deal token account.',
    },
    {
      code: 6024,
      name: 'DealNotOpenForBurningTranches',
      msg: 'Deal not open for burning tranches',
    },
    {
      code: 6025,
      name: 'InvalidLiquidityPoolTrancheInstruction',
      msg: 'This instruction is invalid for tranche funded by liquidity pool.',
    },
    {
      code: 6026,
      name: 'RepaymentPeriodsMissing',
      msg: 'Repayment periods not fully set',
    },
    {
      code: 6027,
      name: 'DealTrancheWithdrawalClosed',
      msg: 'Deal not open for tranche withdrawal',
    },
    {
      code: 6028,
      name: 'DealNotPending',
      msg: 'Deal is not pending',
    },
    {
      code: 6029,
      name: 'RepaymentPeriodsAlreadySet',
      msg: 'Repayment periods already set',
    },
    {
      code: 6030,
      name: 'TotalPeriodsExceeded',
      msg: 'Total periods exceeded',
    },
    {
      code: 6031,
      name: 'InvalidRepaymentSchedule',
      msg: 'Invalid repayment schedule',
    },
    {
      code: 6032,
      name: 'WrongAmountTrancheConfigs',
      msg: 'Wrong number of tranche configs: expected 10',
    },
    {
      code: 6033,
      name: 'TrancheFunded',
      msg: 'Tranche already funded',
    },
    {
      code: 6034,
      name: 'TransferSafeguard',
      msg: 'Transfer safeguard',
    },
    {
      code: 6035,
      name: 'MaxManagersExceeded',
      msg: 'Too many managers specified. Max: 10',
    },
    {
      code: 6036,
      name: 'MaxPassIssuersExceeded',
      msg: 'Too many pass issuers specified. Max: 5',
    },
    {
      code: 6037,
      name: 'InvalidPassInstructionSigner',
      msg: 'The signer does not have permission to issue passes.',
    },
    {
      code: 6038,
      name: 'BaseDepositLimitExceeded',
      msg: 'The max deposit amount limit reached. Please try again later.',
    },
    {
      code: 6039,
      name: 'DaysInYearPeriodDurationRest',
      msg: 'Days in year is not a multiple of period duration',
    },
    {
      code: 6040,
      name: 'CredixPassNotAuthorized',
      msg: 'The signer is not authorized to call the Withdraw Funds instruction.',
    },
    {
      code: 6041,
      name: 'WithdrawEpochAlreadyRunning',
      msg: 'A withdraw epoch is already running.',
    },
    {
      code: 6042,
      name: 'WithdrawEpochNotInRequestPhase',
      msg: 'Withdraw epoch is in its redeem phase or Available liquidity phase and no new withdraw requests are accepted',
    },
    {
      code: 6043,
      name: 'WithdrawEpochInRequestPhase',
      msg: 'Withdraw epoch is in request phase. Please try again later.',
    },
    {
      code: 6044,
      name: 'WithdrawEpochAlreadyEnded',
      msg: 'Withdraw epoch has already ended. Please create a new one using th create withdraw epoch instruction.',
    },
    {
      code: 6045,
      name: 'MintNotOwnedByCredix',
      msg: 'The passed mint account is not initialized by credix program or does not have a freeze authority.',
    },
    {
      code: 6046,
      name: 'NoLiquidityOrLockedLiquidity',
      msg: 'There is no less liquidity or it is locked for a withdraw epoch.',
    },
    {
      code: 6047,
      name: 'InvalidMigrateDealInstruction',
      msg: 'This instruction is not valid for a migrated deal.',
    },
    {
      code: 6048,
      name: 'PeriodDurationIsZero',
      msg: 'Period duration is zero',
    },
    {
      code: 6049,
      name: 'MigrateDealInstruction',
      msg: 'This instruction is only for migrated deals.',
    },
    {
      code: 6050,
      name: 'DuplicateTrancheClaimsInvestors',
      msg: 'Tranche claim configs 2 or more claims with same investor and tranche index.',
    },
    {
      code: 6051,
      name: 'DuplicateLpClaimsInvestor',
      msg: 'Lp claim configs contains 2 or more claims with same investor.',
    },
    {
      code: 6052,
      name: 'TrancheClaimForSeniorTranche',
      msg: 'Tranche claim data invalid provide tranche claims for senior tranche, Use lp claims instead.',
    },
    {
      code: 6053,
      name: 'TrancheClaimAmountInvalid',
      msg: "Tranche claims base amounts don't add up to the tranche size.",
    },
    {
      code: 6054,
      name: 'DealNotOpenForClaims',
      msg: "This migrated deal hasn't been activated yet. It is not open for claims",
    },
    {
      code: 6055,
      name: 'TrancheClaimIndexOutOfBounds',
      msg: 'The tranche claim index is greater then tranche claims length.',
    },
    {
      code: 6056,
      name: 'TrancheClaimInvalidInvestor',
      msg: 'The tranche claim index provided belongs to other investor.',
    },
    {
      code: 6057,
      name: 'TrancheClaimInvalidIndex',
      msg: 'The tranche claim index provided belongs to other tranche index.',
    },
    {
      code: 6058,
      name: 'LpClaimIndexOutOfBounds',
      msg: 'The tranche claim index is greater then tranche claims length.',
    },
    {
      code: 6059,
      name: 'LpClaimInvestorInvalid',
      msg: 'The lp claim index provided belongs to other investor.',
    },
    {
      code: 6060,
      name: 'ModifyingRepaidPeriods',
      msg: 'Can not modify partially repaid periods.',
    },
    {
      code: 6061,
      name: 'DealPrincipalModified',
      msg: 'Can not modify total principal expected in the repayment schedule.',
    },
    {
      code: 6062,
      name: 'StructuringDealForbidden',
      msg: 'Deal should pending or structuring to (re)set the repayment schedule',
    },
    {
      code: 6063,
      name: 'RepaymentScheduleMissing',
      msg: 'Repayment schedule is required for sell order with tranche token',
    },
    {
      code: 6064,
      name: 'DealMissing',
      msg: 'Deal is required for sell order with tranche token',
    },
    {
      code: 6065,
      name: 'TranchePassMissing',
      msg: 'Tranche Pass is required for sell order with tranche token',
    },
    {
      code: 6066,
      name: 'DealTranchesMissing',
      msg: 'Deal Tranches is required for sell order with tranche token',
    },
    {
      code: 6067,
      name: 'SellerTrancheMissing',
      msg: 'Seller Tranche is required for sell order with tranche token',
    },
    {
      code: 6068,
      name: 'WrongAmountTrancheUpscaleConfigs',
      msg: 'Wrong number upscale of tranche configs: expected 10',
    },
    {
      code: 6069,
      name: 'MissingTrancheInfoAccount',
      msg: 'The instruction expected tranche info account: Found None',
    },
    {
      code: 6070,
      name: 'RepaymentPeriodNotFound',
      msg: 'Repayment period index not found',
    },
    {
      code: 6071,
      name: 'TrancheRepaymentMissing',
      msg: 'Tranche repayments missing, Can not adjusts tranches.',
    },
    {
      code: 6072,
      name: 'InvalidPeriodStartTimestamp',
      msg: 'Start of time frame should not be less than the start of repayment schedule',
    },
    {
      code: 6073,
      name: 'StartNotLessThanEnd',
      msg: 'Start of time frame should be less than the end',
    },
    {
      code: 6074,
      name: 'PeriodsNotContinuous',
      msg: 'End of period should be 1 less than the start of next period',
    },
    {
      code: 6075,
      name: 'WaterfallIndexOutOfBounds',
      msg: 'Waterfall index should be less than the length waterfall definitions',
    },
    {
      code: 6076,
      name: 'InvalidDaysOfAccrual',
      msg: 'Days of accrual should be equal to number of days between the start and end of time frame',
    },
    {
      code: 6077,
      name: 'InvalidSeniorTrancheIndex',
      msg: 'There is no senior tranche in the deal with the provided index.',
    },
    {
      code: 6078,
      name: 'PrincipalAlreadyPartiallyPaidBack',
      msg: 'Principal already paid back, not possible to upscale.',
    },
    {
      code: 6079,
      name: 'DealReceivedEarlyInterestPayments',
      msg: 'Received early interest payments, not possible to upscale.',
    },
    {
      code: 6080,
      name: 'CurrentRepaymentPeriodMissing',
      msg: 'The instruction expected current repayment period: Found None',
    },
    {
      code: 6081,
      name: 'TrancheMissing',
      msg: 'The instruction expected some tranche for given index: Found None',
    },
    {
      code: 6082,
      name: 'RevolvingPhasePrincipal',
      msg: 'No principal should be expected for a period in revolving phase',
    },
    {
      code: 6083,
      name: 'MarketHasNoWithdrawEpochs',
      msg: 'Withdraw epochs are not enabled for this market',
    },
    {
      code: 6084,
      name: 'InvalidTokenTransferPayload',
      msg: 'Token transfer payload id is not 3.',
    },
    {
      code: 6085,
      name: 'PayloadFromAddressDoesNotMatch',
      msg: 'Wormhole from address of token does not match',
    },
    {
      code: 6086,
      name: 'WormholeCPICallResultInvalid',
      msg: 'Wormhole smart contracts are acting as bad actors.',
    },
    {
      code: 6087,
      name: 'InvalidTokenTransferPayloadId',
      msg: 'Token transfer payload id is not 1.',
    },
    {
      code: 6088,
      name: 'PeriodWithRepayment',
      msg: 'Tranche rates can only be updated in period which has not received any repayment',
    },
    {
      code: 6089,
      name: 'OffRampTokenAccountMissing',
      msg: 'Off Ramp Token Account is required to withdraw from the deal',
    },
    {
      code: 6090,
      name: 'InvalidOffRampTokenAccount',
      msg: 'Off Ramp Token Account has to same as set in the deal account',
    },
    {
      code: 6091,
      name: 'BorrowerTokenAccountMissing',
      msg: 'Borrower Token Account is required to withdraw from the deal',
    },
    {
      code: 6092,
      name: 'InvalidCollectionTokenAccount',
      msg: 'Collection Token Account has to be same as set in the deal account',
    },
    {
      code: 6093,
      name: 'CredixPassAmountWithdrawnMissing',
      msg: 'Amount withdrawn is expected to be present in credix pass',
    },
    {
      code: 6094,
      name: 'InvalidArrangementFeeCollectionTokenAccount',
      msg: 'Arrangement Fee Collection Token Account has to same as set in the deal account',
    },
    {
      code: 6095,
      name: 'VariableInterestRateAccountMissing',
      msg: 'Tranches use variable rates but VariableInterestRate account not provided',
    },
    {
      code: 6096,
      name: 'MissingArrangementFeeCollectionAuthority',
      msg: 'Arrangement Fee Collection authority Missing',
    },
  ],
};
