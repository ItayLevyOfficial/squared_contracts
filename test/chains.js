const chains = {
  ethereum: {
    nativeToken: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      chainlinkAddress: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
    },
    stableToken: {
      address: '0xb9bEECD1A582768711dE1EE7B0A1d582D9d72a6C',
      chainlinkAddress: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
      decimals: 6
    },
  },
  bsc: {
    nativeToken: {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      chainlinkAddress: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
    },
    stableToken: {
      address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      chainlinkAddress: '0xcBb98864Ef56E9042e7d2efef76141f15731B82f',
      decimals: 18,
    },
  },
}

module.exports = { selectedChain: chains.bsc, chains }
