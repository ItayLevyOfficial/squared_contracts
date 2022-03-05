const chains = {
  harmonyTestnet: {
    nativeToken: {
      chainlinkAddress: '0xcee686f89bc0dabad95aeaac980ae1d97a075fad',
      address: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
      decimals: 18,
      name: 'ONE',
    },
    stableToken: {
      chainlinkAddress: '0x6f2bd4158f771e120d3692c45eb482c16f067dec',
      address: '0x985458e523db3d53125813ed68c274899e9dfab4',
      decimals: 6,
      name: 'USDC',
    },
  },
  ethereum: {
    launchContractAddress: '0xF32D39ff9f6Aa7a7A64d7a4F00a54826Ef791a55',
    nativeToken: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      chainlinkAddress: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
      decimals: 18,
      name: 'ETH',
    },
    stableToken: {
      address: '0x40918Ba7f132E0aCba2CE4de4c4baF9BD2D7D849',
      chainlinkAddress: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
      name: 'USDC',
    },
    sqrdToken: {
      address: '0x8A93d247134d91e0de6f96547cB0204e5BE8e5D8',
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
      name: 'SQRD',
    },
    sqrdLpToken: {
      address: '0xb9bEECD1A582768711dE1EE7B0A1d582D9d72a6C',
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
      name: 'SQRD_LP',
    },
    managerToken: {
      address: '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B', // Fake Manager LP
    },
  },
}

module.exports = { selectedChain: chains.harmonyTestnet }
