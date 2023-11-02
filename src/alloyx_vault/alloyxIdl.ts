export type AlloyxSolana = {
  version: '0.1.0';
  name: 'alloyx_solana';
  instructions: [
    {
      name: 'initialize';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'usdcVaultAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'usdcMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'alloyxVaultAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'alloyxMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'vaultInfoAccount';
          isMut: true;
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
          name: 'vaultId';
          type: 'string';
        }
      ];
    },
    {
      name: 'whitelist';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'investorPass';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'vaultInfoAccount';
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
          name: 'vaultId';
          type: 'string';
        },
        {
          name: 'investor';
          type: 'publicKey';
        }
      ];
    },
    {
      name: 'unwhitelist';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'investorPass';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'vaultInfoAccount';
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
          name: 'vaultId';
          type: 'string';
        },
        {
          name: 'investor';
          type: 'publicKey';
        }
      ];
    },
    {
      name: 'deposit';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'investorPass';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'vaultInfoAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'usdcVaultAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'usdcMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'alloyxVaultAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'alloyxMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userUsdcAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userAlloyxAccount';
          isMut: true;
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
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'vaultId';
          type: 'string';
        },
        {
          name: 'usdcAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'withdraw';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'investorPass';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'vaultInfoAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'usdcVaultAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'usdcMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'alloyxVaultAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'alloyxMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userUsdcAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userAlloyxAccount';
          isMut: true;
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
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'vaultId';
          type: 'string';
        },
        {
          name: 'alloyxAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'transferUsdcOut';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'vaultInfoAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'usdcVaultAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'usdcMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'userUsdcAccount';
          isMut: true;
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
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'vaultId';
          type: 'string';
        },
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'transferUsdcIn';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'vaultInfoAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'usdcVaultAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'usdcMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'userUsdcAccount';
          isMut: true;
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
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'vaultId';
          type: 'string';
        },
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'setVaultInfo';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'vaultInfoAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'usdcMint';
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
          name: 'vaultId';
          type: 'string';
        },
        {
          name: 'walletDeskAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'transferAuthority';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'vaultInfoAccount';
          isMut: true;
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
          name: 'vaultId';
          type: 'string';
        },
        {
          name: 'newAuthority';
          type: 'publicKey';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'vaultInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'walletDeskUsdcValue';
            type: 'u64';
          },
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'usdcMint';
            type: 'publicKey';
          },
          {
            name: 'alloyxMint';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'passInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'investor';
            type: 'publicKey';
          }
        ];
      };
    }
  ];
  events: [
    {
      name: 'DepositEvent';
      fields: [
        {
          name: 'investor';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'usdcAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'duraAmount';
          type: 'u64';
          index: false;
        }
      ];
    },
    {
      name: 'InitializeEvent';
      fields: [
        {
          name: 'authority';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'usdcMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'alloyxMint';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'SetVaultInfoEvent';
      fields: [
        {
          name: 'authority';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'walletDeskAmount';
          type: 'u64';
          index: false;
        }
      ];
    },
    {
      name: 'TransferAuthorityEvent';
      fields: [
        {
          name: 'oldAuthority';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'newAuthority';
          type: 'publicKey';
          index: false;
        }
      ];
    },
    {
      name: 'TransferUsdcInEvent';
      fields: [
        {
          name: 'authority';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'usdcAmount';
          type: 'u64';
          index: false;
        }
      ];
    },
    {
      name: 'TransferUsdcOutEvent';
      fields: [
        {
          name: 'authority';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'usdcAmount';
          type: 'u64';
          index: false;
        }
      ];
    },
    {
      name: 'UnwhitelistEvent';
      fields: [
        {
          name: 'authority';
          type: 'publicKey';
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
      name: 'WhitelistEvent';
      fields: [
        {
          name: 'authority';
          type: 'publicKey';
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
      name: 'WithdrawEvent';
      fields: [
        {
          name: 'investor';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'usdcAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'duraAmount';
          type: 'u64';
          index: false;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'NotAdmin';
      msg: 'Not The Admin';
    },
    {
      code: 6001;
      name: 'NotUsdcMintDetected';
      msg: 'Not The USDC Token Type';
    },
    {
      code: 6002;
      name: 'NotAlloyxMintDetected';
      msg: 'Not The Alloyx Token Type';
    }
  ];
};

export const IDL: AlloyxSolana = {
  version: '0.1.0',
  name: 'alloyx_solana',
  instructions: [
    {
      name: 'initialize',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'usdcVaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'usdcMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'alloyxVaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'alloyxMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'vaultInfoAccount',
          isMut: true,
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
          name: 'vaultId',
          type: 'string',
        },
      ],
    },
    {
      name: 'whitelist',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'investorPass',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vaultInfoAccount',
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
          name: 'vaultId',
          type: 'string',
        },
        {
          name: 'investor',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'unwhitelist',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'investorPass',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vaultInfoAccount',
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
          name: 'vaultId',
          type: 'string',
        },
        {
          name: 'investor',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'deposit',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'investorPass',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'vaultInfoAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'usdcVaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'usdcMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'alloyxVaultAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'alloyxMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userUsdcAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userAlloyxAccount',
          isMut: true,
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
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'vaultId',
          type: 'string',
        },
        {
          name: 'usdcAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'withdraw',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'investorPass',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'vaultInfoAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'usdcVaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'usdcMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'alloyxVaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'alloyxMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userUsdcAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userAlloyxAccount',
          isMut: true,
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
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'vaultId',
          type: 'string',
        },
        {
          name: 'alloyxAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'transferUsdcOut',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'vaultInfoAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'usdcVaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'usdcMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'userUsdcAccount',
          isMut: true,
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
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'vaultId',
          type: 'string',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'transferUsdcIn',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'vaultInfoAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'usdcVaultAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'usdcMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'userUsdcAccount',
          isMut: true,
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
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'vaultId',
          type: 'string',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'setVaultInfo',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'vaultInfoAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'usdcMint',
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
          name: 'vaultId',
          type: 'string',
        },
        {
          name: 'walletDeskAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'transferAuthority',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'vaultInfoAccount',
          isMut: true,
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
          name: 'vaultId',
          type: 'string',
        },
        {
          name: 'newAuthority',
          type: 'publicKey',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'vaultInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'walletDeskUsdcValue',
            type: 'u64',
          },
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'usdcMint',
            type: 'publicKey',
          },
          {
            name: 'alloyxMint',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'passInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'investor',
            type: 'publicKey',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'DepositEvent',
      fields: [
        {
          name: 'investor',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'usdcAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'duraAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'InitializeEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'usdcMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'alloyxMint',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'SetVaultInfoEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'walletDeskAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'TransferAuthorityEvent',
      fields: [
        {
          name: 'oldAuthority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'newAuthority',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'TransferUsdcInEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'usdcAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'TransferUsdcOutEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'usdcAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'UnwhitelistEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
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
      name: 'WhitelistEvent',
      fields: [
        {
          name: 'authority',
          type: 'publicKey',
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
      name: 'WithdrawEvent',
      fields: [
        {
          name: 'investor',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'usdcAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'duraAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'NotAdmin',
      msg: 'Not The Admin',
    },
    {
      code: 6001,
      name: 'NotUsdcMintDetected',
      msg: 'Not The USDC Token Type',
    },
    {
      code: 6002,
      name: 'NotAlloyxMintDetected',
      msg: 'Not The Alloyx Token Type',
    },
  ],
};
