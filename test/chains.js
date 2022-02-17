const chains = {
  ethereum: {
    forkData: {
      url:
        'https://eth-mainnet.alchemyapi.io/v2/2wzUWNwC9bpWNB5tNUznTTL0yogzqamW',
      blockNumber: 14101114,
    },
    nativeToken: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      chainlinkAddress: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
    },
    stableToken: {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      chainlinkAddress: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
    },
  },
  bsc: {
    forkData: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      blockNumber: 16841296,
    },
  },
}

module.exports = { selectedChain: chains.ethereum }
