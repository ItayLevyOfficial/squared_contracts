const chains = {
  ethereum: {
    nativeToken: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      chainlinkAddress: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
    },
    stableToken: {
      address: '0xF32D39ff9f6Aa7a7A64d7a4F00a54826Ef791a55', // Fake USDC
      chainlinkAddress: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
    },
    sqrdToken: {
      address: '0x40918Ba7f132E0aCba2CE4de4c4baF9BD2D7D849', // Fake SQRD
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
    },
    sqrdLpToken: {
      address: '0x8A93d247134d91e0de6f96547cB0204e5BE8e5D8', // Fake SQRD LP
      decimals: 6,
      slot: 9, // To update the balance manually on hardhat network
    },
  },
}

module.exports = { selectedChain: chains.ethereum }
