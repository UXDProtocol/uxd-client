export declare type Credix = {
  version: '3.2.0';
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
          name: 'performanceFee';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'withdrawalFee';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'gracePeriod';
          type: 'u8';
        },
        {
          name: 'fixedLateFeePercentage';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'variableLateFeePercentage';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'serviceFeePercentage';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'credixPerformanceFeePercentage';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'credixServiceFeePercentage';
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
          name: 'trueWaterfall';
          type: 'bool';
        },
        {
          name: 'slashInterestToPrincipal';
          type: 'bool';
        },
        {
          name: 'slashPrincipalToInterest';
          type: 'bool';
        },
        {
          name: 'serviceFees';
          type: 'u64';
        },
        {
          name: 'fixedLateFeePercentage';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'performanceFeePercentage';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'gracePeriod';
          type: {
            option: 'u8';
          };
        },
        {
          name: 'variableLateFeePercentage';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'serviceFeePercentage';
          type: {
            option: {
              defined: 'Fraction';
            };
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
          name: 'borrower';
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
          name: 'totalRepayments';
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
          name: 'periodDuration';
          type: 'u8';
        },
        {
          name: 'daysInYear';
          type: 'u16';
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
          name: 'borrower';
          isMut: true;
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
          name: 'tokenProgram';
          isMut: false;
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
      name: 'withdrawFunds';
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
          name: 'borrower';
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
          name: 'investor';
          isMut: true;
          isSigner: true;
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
          name: 'globalMarketState';
          isMut: true;
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
          name: 'investorTranche';
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
                value: 'tranche';
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
        },
        {
          name: 'amount';
          type: 'u64';
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
        },
        {
          name: 'credixServiceFeePercentage';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'credixPerformanceFeePercentage';
          type: {
            defined: 'Fraction';
          };
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
          name: 'credixPerformanceFeePercentage';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'credixServiceFeePercentage';
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
        },
        {
          name: 'credixPerformanceFeePercentage';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'credixServiceFeePercentage';
          type: {
            option: {
              defined: 'Fraction';
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
          name: 'performanceFee';
          type: {
            option: {
              defined: 'Fraction';
            };
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
          name: 'serviceFeePercentage';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'gracePeriod';
          type: {
            option: 'u8';
          };
        },
        {
          name: 'fixedLateFeePercentage';
          type: {
            option: {
              defined: 'Fraction';
            };
          };
        },
        {
          name: 'variableLateFeePercentage';
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
        }
      ];
    },
    {
      name: 'updateDeal';
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
          name: 'serviceFeePercentage';
          type: {
            defined: 'Fraction';
          };
        },
        {
          name: 'serviceFees';
          type: 'u64';
        },
        {
          name: 'serviceFeesRepaid';
          type: 'u64';
        },
        {
          name: 'yearLatestServiceFeesCharged';
          type: 'u8';
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
      name: 'repayServiceFees';
      accounts: [
        {
          name: 'borrower';
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
    }
  ];
  accounts: [
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
              array: [
                {
                  defined: 'DealTranche';
                },
                10
              ];
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
            type: 'u64';
          },
          {
            name: 'fixedLateFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'earlyRedemptionFees';
            type: 'u64';
          },
          {
            name: 'earlyRedemptionFeesRepaid';
            type: 'u64';
          },
          {
            name: 'unusedField1';
            type: 'u16';
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
            name: 'slashInterestToPrincipal';
            type: 'bool';
          },
          {
            name: 'slashPrincipalToInterest';
            type: 'bool';
          },
          {
            name: 'unusedField2';
            type: {
              array: ['u8', 6];
            };
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
            name: 'fixedLateFees';
            type: 'u64';
          },
          {
            name: 'lateFeesRepaid';
            type: 'u64';
          },
          {
            name: 'defaulted';
            type: 'bool';
          },
          {
            name: 'trueWaterfall';
            type: 'bool';
          },
          {
            name: 'openedAt';
            type: 'i64';
          },
          {
            name: 'performanceFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'gracePeriod';
            type: 'u8';
          },
          {
            name: 'variableLateFees';
            type: 'u64';
          },
          {
            name: 'variableLateFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'serviceFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'serviceFees';
            type: 'u64';
          },
          {
            name: 'serviceFeesRepaid';
            type: 'u64';
          },
          {
            name: 'yearLatestServiceFeesCharged';
            type: 'u8';
          },
          {
            name: 'migrated';
            type: 'bool';
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
            name: 'unusedPubkey';
            type: 'publicKey';
          },
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
            name: 'performanceFee';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'withdrawalFee';
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
            name: 'gracePeriod';
            type: 'u8';
          },
          {
            name: 'fixedLateFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'variableLateFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'serviceFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'credixPerformanceFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'credixServiceFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'poolSizeLimitPercentage';
            type: {
              defined: 'Fraction';
            };
          }
        ];
      };
    },
    {
      name: 'investorTranche';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'trancheIndex';
            type: 'u8';
          },
          {
            name: 'investor';
            type: 'publicKey';
          },
          {
            name: 'amountWithdrawn';
            type: 'u64';
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
          },
          {
            name: 'credixPerformanceFeePercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'credixServiceFeePercentage';
            type: {
              defined: 'Fraction';
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
            name: 'periodDuration';
            type: 'u8';
          },
          {
            name: 'daysInYear';
            type: 'u16';
          },
          {
            name: 'totalPeriods';
            type: 'u16';
          },
          {
            name: 'periods';
            type: {
              vec: {
                defined: 'RepaymentPeriod';
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
          }
        ];
      };
    }
  ];
  types: [
    {
      name: 'TrancheConfig';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'size';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'returnPercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'maxDepositPercentage';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'earlyWithdrawalInterest';
            type: 'bool';
          },
          {
            name: 'earlyWithdrawalPrincipal';
            type: 'bool';
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
      name: 'DealTranche';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'index';
            type: 'u8';
          },
          {
            name: 'size';
            type: 'u64';
          },
          {
            name: 'expectedReturn';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'amountDeposited';
            type: 'u64';
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
            name: 'earlyWithdrawalInterest';
            type: 'bool';
          },
          {
            name: 'earlyWithdrawalPrincipal';
            type: 'bool';
          },
          {
            name: 'withdrawableInterest';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'withdrawablePrincipal';
            type: {
              defined: 'Fraction';
            };
          },
          {
            name: 'padding';
            type: {
              array: ['u8', 28];
            };
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
            name: 'principal';
            type: 'u64';
          },
          {
            name: 'interest';
            type: 'u64';
          },
          {
            name: 'totalInterestExpected';
            type: 'u64';
          },
          {
            name: 'totalPrincipalExpected';
            type: 'u64';
          },
          {
            name: 'principalRepaid';
            type: 'u64';
          },
          {
            name: 'interestRepaid';
            type: 'u64';
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
            name: 'principal';
            type: 'u64';
          },
          {
            name: 'interest';
            type: 'u64';
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
          },
          {
            name: 'Closed';
          },
          {
            name: 'Defaulted';
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
          name: 'seniorTrancheSize';
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
      name: 'DepositTrancheEvent';
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
          name: 'investor';
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
      name: 'InvalidPrincipalAmount';
      msg: 'This amount is not sufficient as a principal amount.';
    },
    {
      code: 6001;
      name: 'InvalidInterestAmount';
      msg: 'This amount is not sufficient as an interest amount.';
    },
    {
      code: 6002;
      name: 'DealNotLive';
      msg: 'This deal is not live yet.';
    },
    {
      code: 6003;
      name: 'InvalidDealRepaymentType';
      msg: 'Invalid deal repayment type.';
    },
    {
      code: 6004;
      name: 'NotEnoughLiquidity';
      msg: 'Not enough liquidity.';
    },
    {
      code: 6005;
      name: 'PrincipalRepaid';
      msg: 'Principal is already repaid.';
    },
    {
      code: 6006;
      name: 'InterestRepaid';
      msg: 'Interest is already repaid.';
    },
    {
      code: 6007;
      name: 'UnauthorizedSigner';
      msg: 'The Signer is not authorized to use this instruction.';
    },
    {
      code: 6008;
      name: 'CredixPassInvalid';
      msg: 'Credix pass is invalid for this request.';
    },
    {
      code: 6009;
      name: 'CredixPassInactive';
      msg: 'Credix pass is inactive at the moment.';
    },
    {
      code: 6010;
      name: 'Overflow';
      msg: 'Overflow occurred.';
    },
    {
      code: 6011;
      name: 'Underflow';
      msg: 'Underflow occurred.';
    },
    {
      code: 6012;
      name: 'ZeroDivision';
      msg: 'Tried to divide by zero.';
    },
    {
      code: 6013;
      name: 'ZeroDenominator';
      msg: "Invalid Ratio: denominator can't be zero.";
    },
    {
      code: 6014;
      name: 'InvalidPreciseNumber';
      msg: 'Invalid u64 used as value for PreciseNumber.';
    },
    {
      code: 6015;
      name: 'PreciseNumberCastFailed';
      msg: 'Unable to cast PreciseNumber to u64';
    },
    {
      code: 6016;
      name: 'NotEnoughLPTokens';
      msg: 'Not enough LP tokens.';
    },
    {
      code: 6017;
      name: 'NotEnoughBaseTokens';
      msg: 'Not enough Base tokens.';
    },
    {
      code: 6018;
      name: 'InterestBeforePrincipal';
      msg: 'Repay interest before principal.';
    },
    {
      code: 6019;
      name: 'MarketIsFrozen';
      msg: 'This market is currently frozen. Please try again later.';
    },
    {
      code: 6020;
      name: 'InvalidBorrowerTokenAccount';
      msg: 'Invalid Borrower Token Account.';
    },
    {
      code: 6021;
      name: 'InvalidBorrowerAccount';
      msg: 'Invalid Borrower Account.';
    },
    {
      code: 6022;
      name: 'DealAlreadyActive';
      msg: 'Deal is already active.';
    },
    {
      code: 6023;
      name: 'InvalidInvestorTokenAccount';
      msg: 'Invalid Investor Token Account.';
    },
    {
      code: 6024;
      name: 'InvalidTokenAccountMint';
      msg: 'Invalid mint for Token Account.';
    },
    {
      code: 6025;
      name: 'InvalidMintAccount';
      msg: 'Invalid mint Account.';
    },
    {
      code: 6026;
      name: 'InvalidTreasuryAccount';
      msg: 'Invalid treasury Account for this market.';
    },
    {
      code: 6027;
      name: 'WithdrawalsLocked';
      msg: 'Not yet possible to withdraw funds.';
    },
    {
      code: 6028;
      name: 'TotalTrancheSizeNotOne';
      msg: 'Total tranche size should be one.';
    },
    {
      code: 6029;
      name: 'TotalTrancheReturnsNotOne';
      msg: 'Total tranche returns should be one.';
    },
    {
      code: 6030;
      name: 'InvalidTrancheSizeOrReturns';
      msg: 'A tranche with a size should have a value for its returns and vice versa.';
    },
    {
      code: 6031;
      name: 'InvalidTrancheIndex';
      msg: 'There is no tranche in the deal with the provided index.';
    },
    {
      code: 6032;
      name: 'DealAlreadyOpen';
      msg: 'Deal is already opened.';
    },
    {
      code: 6033;
      name: 'DealNotOpen';
      msg: 'This deal is not open for funding yet.';
    },
    {
      code: 6034;
      name: 'TranchePassInactive';
      msg: 'Tranche pass is inactive at the moment.';
    },
    {
      code: 6035;
      name: 'InvalidInstructionDepositTranche';
      msg: "Deposit Tranche instruction doesn't exist for senior tranche(index=1).";
    },
    {
      code: 6036;
      name: 'RepaymentPeriodsPrincipalValuesInvalid';
      msg: 'Total sum of all the principal should be equal to the total principal of the deal.';
    },
    {
      code: 6037;
      name: 'NotEnoughTokens';
      msg: 'Not enough tokens';
    },
    {
      code: 6038;
      name: 'DealNotOpenForActivation';
      msg: 'A deal can only be activated once all tranches(except for the senior tranche at index 1) have been filled.';
    },
    {
      code: 6039;
      name: 'DealNotInProgress';
      msg: 'Deal not in progress';
    },
    {
      code: 6040;
      name: 'DealNotOpenForFunding';
      msg: 'Deal not open for funding';
    },
    {
      code: 6041;
      name: 'InvalidDealTokenAccount';
      msg: 'Invalid deal token account.';
    },
    {
      code: 6042;
      name: 'DealNotOpenForBurningTranches';
      msg: 'Deal not open for burning tranches';
    },
    {
      code: 6043;
      name: 'InvalidSeniorTrancheInstruction';
      msg: 'This instruction is invalid for senior tranche.';
    },
    {
      code: 6044;
      name: 'RepaymentPeriodsMissing';
      msg: 'Repayment periods not fully set';
    },
    {
      code: 6045;
      name: 'LastRepaymentInvalid';
      msg: 'Last repayment in the repayment schedule should have some value for principal or interest';
    },
    {
      code: 6046;
      name: 'ScheduleWithZeroRepayments';
      msg: 'Repayment schedule has zero entries';
    },
    {
      code: 6047;
      name: 'DealTrancheWithdrawalClosed';
      msg: 'Deal not open for tranche withdrawal';
    },
    {
      code: 6048;
      name: 'DealNotPending';
      msg: 'Deal is not pending';
    },
    {
      code: 6049;
      name: 'RepaymentPeriodsAlreadySet';
      msg: 'Repayment periods already set';
    },
    {
      code: 6050;
      name: 'TotalPeriodsExceeded';
      msg: 'Total periods exceeded';
    },
    {
      code: 6051;
      name: 'InvalidRepaymentSchedule';
      msg: 'Invalid repayment schedule';
    },
    {
      code: 6052;
      name: 'WrongAmountTrancheConfigs';
      msg: 'Wrong number of tranche configs: expected 10';
    },
    {
      code: 6053;
      name: 'RemainderCalculationFailed';
      msg: 'Could not calculate remainder';
    },
    {
      code: 6054;
      name: 'SimplifyFractionFailed';
      msg: 'Could not simplify fraction';
    },
    {
      code: 6055;
      name: 'TrancheFunded';
      msg: 'Tranche already funded';
    },
    {
      code: 6056;
      name: 'TransferSafeguard';
      msg: 'Transfer safeguard';
    },
    {
      code: 6057;
      name: 'MaxManagersExceeded';
      msg: 'Too many managers specified. Max: 10';
    },
    {
      code: 6058;
      name: 'MaxPassIssuersExceeded';
      msg: 'Too many pass issuers specified. Max: 5';
    },
    {
      code: 6059;
      name: 'InvalidPassInstructionSigner';
      msg: 'The signer does not have permission to issue passes.';
    },
    {
      code: 6060;
      name: 'PeriodIndexOutOfBounds';
      msg: 'The period index exceeds the length of periods.';
    },
    {
      code: 6061;
      name: 'BaseDepositLimitExceeded';
      msg: 'The max deposit amount limit reached. Please try again later.';
    },
    {
      code: 6062;
      name: 'DaysInYearPeriodDurationRest';
      msg: 'Days in year is not a multiple of period duration';
    },
    {
      code: 6063;
      name: 'MintNotOwnedByCredix';
      msg: 'The passed mint account is not initialized by credix program or does not have a freeze authority.';
    },
    {
      code: 6064;
      name: 'PeriodDurationIsZero';
      msg: 'Period duration is zero';
    },
    {
      code: 6065;
      name: 'ModifyingRepaidPeriods';
      msg: 'Can not modify partially repaid periods.';
    },
    {
      code: 6066;
      name: 'DealPrincipalModified';
      msg: 'Can not modify total principal expected in the repayment schedule.';
    },
    {
      code: 6067;
      name: 'StructuringDealForbidden';
      msg: 'Deal should pending or structuring to (re)set the repayment schedule';
    }
  ];
};

export const IDL: Credix = {
  version: '3.2.0',
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
          name: 'performanceFee',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'withdrawalFee',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'gracePeriod',
          type: 'u8',
        },
        {
          name: 'fixedLateFeePercentage',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'variableLateFeePercentage',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'serviceFeePercentage',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'credixPerformanceFeePercentage',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'credixServiceFeePercentage',
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
          name: 'trueWaterfall',
          type: 'bool',
        },
        {
          name: 'slashInterestToPrincipal',
          type: 'bool',
        },
        {
          name: 'slashPrincipalToInterest',
          type: 'bool',
        },
        {
          name: 'serviceFees',
          type: 'u64',
        },
        {
          name: 'fixedLateFeePercentage',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'performanceFeePercentage',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'gracePeriod',
          type: {
            option: 'u8',
          },
        },
        {
          name: 'variableLateFeePercentage',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'serviceFeePercentage',
          type: {
            option: {
              defined: 'Fraction',
            },
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
          name: 'borrower',
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
          name: 'totalRepayments',
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
          name: 'periodDuration',
          type: 'u8',
        },
        {
          name: 'daysInYear',
          type: 'u16',
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
          name: 'borrower',
          isMut: true,
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
          name: 'tokenProgram',
          isMut: false,
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
      name: 'withdrawFunds',
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
          name: 'borrower',
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
          name: 'investor',
          isMut: true,
          isSigner: true,
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
          name: 'globalMarketState',
          isMut: true,
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
          name: 'investorTranche',
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
                value: 'tranche',
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
        {
          name: 'amount',
          type: 'u64',
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
        {
          name: 'credixServiceFeePercentage',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'credixPerformanceFeePercentage',
          type: {
            defined: 'Fraction',
          },
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
          name: 'credixPerformanceFeePercentage',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'credixServiceFeePercentage',
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
        {
          name: 'credixPerformanceFeePercentage',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'credixServiceFeePercentage',
          type: {
            option: {
              defined: 'Fraction',
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
          name: 'performanceFee',
          type: {
            option: {
              defined: 'Fraction',
            },
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
          name: 'serviceFeePercentage',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'gracePeriod',
          type: {
            option: 'u8',
          },
        },
        {
          name: 'fixedLateFeePercentage',
          type: {
            option: {
              defined: 'Fraction',
            },
          },
        },
        {
          name: 'variableLateFeePercentage',
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
      ],
    },
    {
      name: 'updateDeal',
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
          name: 'serviceFeePercentage',
          type: {
            defined: 'Fraction',
          },
        },
        {
          name: 'serviceFees',
          type: 'u64',
        },
        {
          name: 'serviceFeesRepaid',
          type: 'u64',
        },
        {
          name: 'yearLatestServiceFeesCharged',
          type: 'u8',
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
      name: 'repayServiceFees',
      accounts: [
        {
          name: 'borrower',
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
  ],
  accounts: [
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
              array: [
                {
                  defined: 'DealTranche',
                },
                10,
              ],
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
            type: 'u64',
          },
          {
            name: 'fixedLateFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'earlyRedemptionFees',
            type: 'u64',
          },
          {
            name: 'earlyRedemptionFeesRepaid',
            type: 'u64',
          },
          {
            name: 'unusedField1',
            type: 'u16',
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
            name: 'slashInterestToPrincipal',
            type: 'bool',
          },
          {
            name: 'slashPrincipalToInterest',
            type: 'bool',
          },
          {
            name: 'unusedField2',
            type: {
              array: ['u8', 6],
            },
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
            name: 'fixedLateFees',
            type: 'u64',
          },
          {
            name: 'lateFeesRepaid',
            type: 'u64',
          },
          {
            name: 'defaulted',
            type: 'bool',
          },
          {
            name: 'trueWaterfall',
            type: 'bool',
          },
          {
            name: 'openedAt',
            type: 'i64',
          },
          {
            name: 'performanceFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'gracePeriod',
            type: 'u8',
          },
          {
            name: 'variableLateFees',
            type: 'u64',
          },
          {
            name: 'variableLateFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'serviceFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'serviceFees',
            type: 'u64',
          },
          {
            name: 'serviceFeesRepaid',
            type: 'u64',
          },
          {
            name: 'yearLatestServiceFeesCharged',
            type: 'u8',
          },
          {
            name: 'migrated',
            type: 'bool',
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
            name: 'unusedPubkey',
            type: 'publicKey',
          },
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
            name: 'performanceFee',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'withdrawalFee',
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
            name: 'gracePeriod',
            type: 'u8',
          },
          {
            name: 'fixedLateFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'variableLateFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'serviceFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'credixPerformanceFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'credixServiceFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'poolSizeLimitPercentage',
            type: {
              defined: 'Fraction',
            },
          },
        ],
      },
    },
    {
      name: 'investorTranche',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'trancheIndex',
            type: 'u8',
          },
          {
            name: 'investor',
            type: 'publicKey',
          },
          {
            name: 'amountWithdrawn',
            type: 'u64',
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
          {
            name: 'credixPerformanceFeePercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'credixServiceFeePercentage',
            type: {
              defined: 'Fraction',
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
            name: 'periodDuration',
            type: 'u8',
          },
          {
            name: 'daysInYear',
            type: 'u16',
          },
          {
            name: 'totalPeriods',
            type: 'u16',
          },
          {
            name: 'periods',
            type: {
              vec: {
                defined: 'RepaymentPeriod',
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
        ],
      },
    },
  ],
  types: [
    {
      name: 'TrancheConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'size',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'returnPercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'maxDepositPercentage',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'earlyWithdrawalInterest',
            type: 'bool',
          },
          {
            name: 'earlyWithdrawalPrincipal',
            type: 'bool',
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
      name: 'DealTranche',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'index',
            type: 'u8',
          },
          {
            name: 'size',
            type: 'u64',
          },
          {
            name: 'expectedReturn',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'amountDeposited',
            type: 'u64',
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
            name: 'earlyWithdrawalInterest',
            type: 'bool',
          },
          {
            name: 'earlyWithdrawalPrincipal',
            type: 'bool',
          },
          {
            name: 'withdrawableInterest',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'withdrawablePrincipal',
            type: {
              defined: 'Fraction',
            },
          },
          {
            name: 'padding',
            type: {
              array: ['u8', 28],
            },
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
            name: 'principal',
            type: 'u64',
          },
          {
            name: 'interest',
            type: 'u64',
          },
          {
            name: 'totalInterestExpected',
            type: 'u64',
          },
          {
            name: 'totalPrincipalExpected',
            type: 'u64',
          },
          {
            name: 'principalRepaid',
            type: 'u64',
          },
          {
            name: 'interestRepaid',
            type: 'u64',
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
            name: 'principal',
            type: 'u64',
          },
          {
            name: 'interest',
            type: 'u64',
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
          {
            name: 'Closed',
          },
          {
            name: 'Defaulted',
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
          name: 'seniorTrancheSize',
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
      name: 'DepositTrancheEvent',
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
          name: 'investor',
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
      name: 'InvalidPrincipalAmount',
      msg: 'This amount is not sufficient as a principal amount.',
    },
    {
      code: 6001,
      name: 'InvalidInterestAmount',
      msg: 'This amount is not sufficient as an interest amount.',
    },
    {
      code: 6002,
      name: 'DealNotLive',
      msg: 'This deal is not live yet.',
    },
    {
      code: 6003,
      name: 'InvalidDealRepaymentType',
      msg: 'Invalid deal repayment type.',
    },
    {
      code: 6004,
      name: 'NotEnoughLiquidity',
      msg: 'Not enough liquidity.',
    },
    {
      code: 6005,
      name: 'PrincipalRepaid',
      msg: 'Principal is already repaid.',
    },
    {
      code: 6006,
      name: 'InterestRepaid',
      msg: 'Interest is already repaid.',
    },
    {
      code: 6007,
      name: 'UnauthorizedSigner',
      msg: 'The Signer is not authorized to use this instruction.',
    },
    {
      code: 6008,
      name: 'CredixPassInvalid',
      msg: 'Credix pass is invalid for this request.',
    },
    {
      code: 6009,
      name: 'CredixPassInactive',
      msg: 'Credix pass is inactive at the moment.',
    },
    {
      code: 6010,
      name: 'Overflow',
      msg: 'Overflow occurred.',
    },
    {
      code: 6011,
      name: 'Underflow',
      msg: 'Underflow occurred.',
    },
    {
      code: 6012,
      name: 'ZeroDivision',
      msg: 'Tried to divide by zero.',
    },
    {
      code: 6013,
      name: 'ZeroDenominator',
      msg: "Invalid Ratio: denominator can't be zero.",
    },
    {
      code: 6014,
      name: 'InvalidPreciseNumber',
      msg: 'Invalid u64 used as value for PreciseNumber.',
    },
    {
      code: 6015,
      name: 'PreciseNumberCastFailed',
      msg: 'Unable to cast PreciseNumber to u64',
    },
    {
      code: 6016,
      name: 'NotEnoughLPTokens',
      msg: 'Not enough LP tokens.',
    },
    {
      code: 6017,
      name: 'NotEnoughBaseTokens',
      msg: 'Not enough Base tokens.',
    },
    {
      code: 6018,
      name: 'InterestBeforePrincipal',
      msg: 'Repay interest before principal.',
    },
    {
      code: 6019,
      name: 'MarketIsFrozen',
      msg: 'This market is currently frozen. Please try again later.',
    },
    {
      code: 6020,
      name: 'InvalidBorrowerTokenAccount',
      msg: 'Invalid Borrower Token Account.',
    },
    {
      code: 6021,
      name: 'InvalidBorrowerAccount',
      msg: 'Invalid Borrower Account.',
    },
    {
      code: 6022,
      name: 'DealAlreadyActive',
      msg: 'Deal is already active.',
    },
    {
      code: 6023,
      name: 'InvalidInvestorTokenAccount',
      msg: 'Invalid Investor Token Account.',
    },
    {
      code: 6024,
      name: 'InvalidTokenAccountMint',
      msg: 'Invalid mint for Token Account.',
    },
    {
      code: 6025,
      name: 'InvalidMintAccount',
      msg: 'Invalid mint Account.',
    },
    {
      code: 6026,
      name: 'InvalidTreasuryAccount',
      msg: 'Invalid treasury Account for this market.',
    },
    {
      code: 6027,
      name: 'WithdrawalsLocked',
      msg: 'Not yet possible to withdraw funds.',
    },
    {
      code: 6028,
      name: 'TotalTrancheSizeNotOne',
      msg: 'Total tranche size should be one.',
    },
    {
      code: 6029,
      name: 'TotalTrancheReturnsNotOne',
      msg: 'Total tranche returns should be one.',
    },
    {
      code: 6030,
      name: 'InvalidTrancheSizeOrReturns',
      msg: 'A tranche with a size should have a value for its returns and vice versa.',
    },
    {
      code: 6031,
      name: 'InvalidTrancheIndex',
      msg: 'There is no tranche in the deal with the provided index.',
    },
    {
      code: 6032,
      name: 'DealAlreadyOpen',
      msg: 'Deal is already opened.',
    },
    {
      code: 6033,
      name: 'DealNotOpen',
      msg: 'This deal is not open for funding yet.',
    },
    {
      code: 6034,
      name: 'TranchePassInactive',
      msg: 'Tranche pass is inactive at the moment.',
    },
    {
      code: 6035,
      name: 'InvalidInstructionDepositTranche',
      msg: "Deposit Tranche instruction doesn't exist for senior tranche(index=1).",
    },
    {
      code: 6036,
      name: 'RepaymentPeriodsPrincipalValuesInvalid',
      msg: 'Total sum of all the principal should be equal to the total principal of the deal.',
    },
    {
      code: 6037,
      name: 'NotEnoughTokens',
      msg: 'Not enough tokens',
    },
    {
      code: 6038,
      name: 'DealNotOpenForActivation',
      msg: 'A deal can only be activated once all tranches(except for the senior tranche at index 1) have been filled.',
    },
    {
      code: 6039,
      name: 'DealNotInProgress',
      msg: 'Deal not in progress',
    },
    {
      code: 6040,
      name: 'DealNotOpenForFunding',
      msg: 'Deal not open for funding',
    },
    {
      code: 6041,
      name: 'InvalidDealTokenAccount',
      msg: 'Invalid deal token account.',
    },
    {
      code: 6042,
      name: 'DealNotOpenForBurningTranches',
      msg: 'Deal not open for burning tranches',
    },
    {
      code: 6043,
      name: 'InvalidSeniorTrancheInstruction',
      msg: 'This instruction is invalid for senior tranche.',
    },
    {
      code: 6044,
      name: 'RepaymentPeriodsMissing',
      msg: 'Repayment periods not fully set',
    },
    {
      code: 6045,
      name: 'LastRepaymentInvalid',
      msg: 'Last repayment in the repayment schedule should have some value for principal or interest',
    },
    {
      code: 6046,
      name: 'ScheduleWithZeroRepayments',
      msg: 'Repayment schedule has zero entries',
    },
    {
      code: 6047,
      name: 'DealTrancheWithdrawalClosed',
      msg: 'Deal not open for tranche withdrawal',
    },
    {
      code: 6048,
      name: 'DealNotPending',
      msg: 'Deal is not pending',
    },
    {
      code: 6049,
      name: 'RepaymentPeriodsAlreadySet',
      msg: 'Repayment periods already set',
    },
    {
      code: 6050,
      name: 'TotalPeriodsExceeded',
      msg: 'Total periods exceeded',
    },
    {
      code: 6051,
      name: 'InvalidRepaymentSchedule',
      msg: 'Invalid repayment schedule',
    },
    {
      code: 6052,
      name: 'WrongAmountTrancheConfigs',
      msg: 'Wrong number of tranche configs: expected 10',
    },
    {
      code: 6053,
      name: 'RemainderCalculationFailed',
      msg: 'Could not calculate remainder',
    },
    {
      code: 6054,
      name: 'SimplifyFractionFailed',
      msg: 'Could not simplify fraction',
    },
    {
      code: 6055,
      name: 'TrancheFunded',
      msg: 'Tranche already funded',
    },
    {
      code: 6056,
      name: 'TransferSafeguard',
      msg: 'Transfer safeguard',
    },
    {
      code: 6057,
      name: 'MaxManagersExceeded',
      msg: 'Too many managers specified. Max: 10',
    },
    {
      code: 6058,
      name: 'MaxPassIssuersExceeded',
      msg: 'Too many pass issuers specified. Max: 5',
    },
    {
      code: 6059,
      name: 'InvalidPassInstructionSigner',
      msg: 'The signer does not have permission to issue passes.',
    },
    {
      code: 6060,
      name: 'PeriodIndexOutOfBounds',
      msg: 'The period index exceeds the length of periods.',
    },
    {
      code: 6061,
      name: 'BaseDepositLimitExceeded',
      msg: 'The max deposit amount limit reached. Please try again later.',
    },
    {
      code: 6062,
      name: 'DaysInYearPeriodDurationRest',
      msg: 'Days in year is not a multiple of period duration',
    },
    {
      code: 6063,
      name: 'MintNotOwnedByCredix',
      msg: 'The passed mint account is not initialized by credix program or does not have a freeze authority.',
    },
    {
      code: 6064,
      name: 'PeriodDurationIsZero',
      msg: 'Period duration is zero',
    },
    {
      code: 6065,
      name: 'ModifyingRepaidPeriods',
      msg: 'Can not modify partially repaid periods.',
    },
    {
      code: 6066,
      name: 'DealPrincipalModified',
      msg: 'Can not modify total principal expected in the repayment schedule.',
    },
    {
      code: 6067,
      name: 'StructuringDealForbidden',
      msg: 'Deal should pending or structuring to (re)set the repayment schedule',
    },
  ],
};
