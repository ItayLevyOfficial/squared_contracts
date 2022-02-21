const chains = {
  ethereum: {
    nativeToken: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      chainlinkAddress: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
    },
    stableToken: {
      address: '0xb9bEECD1A582768711dE1EE7B0A1d582D9d72a6C', // Fake USDC
      chainlinkAddress: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
    },
    sqrdToken: {
      address: '0x638A246F0Ec8883eF68280293FFE8Cfbabe61B44', // Fake SQRD
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
    },
    sqrdLpToken: {
      address: '0x0ed64d01D0B4B655E410EF1441dD677B695639E7', // Fake SQRD LP
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
    },
  },
}

module.exports = { selectedChain: chains.ethereum }
