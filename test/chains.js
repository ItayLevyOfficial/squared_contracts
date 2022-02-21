const chains = {
  ethereum: {
    nativeToken: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      chainlinkAddress: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
    },
    stableToken: {
      address: '0xCA8c8688914e0F7096c920146cd0Ad85cD7Ae8b9',
      chainlinkAddress: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
    },
    sqrdToken: {
      address: '0x6F6f570F45833E249e27022648a26F4076F48f78',
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
    },
    sqrdLpToken: {
      address: '0x99dBE4AEa58E518C50a1c04aE9b48C9F6354612f',
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
    },
    managerToken: {
      address: '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B', // Fake Manager LP
    },
  },
}

module.exports = { selectedChain: chains.ethereum }
