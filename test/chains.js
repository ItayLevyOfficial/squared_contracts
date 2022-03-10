const chains = {
  harmonyTestnet: {
    nativeToken: {
      chainlinkAddress: '0x4f11696cE92D78165E1F8A9a4192444087a45b64',
      address: '0x7466d7d0c21fa05f32f5a0fa27e12bdc06348ce2',
      decimals: 18,
      name: 'ONE',
    },
    stableToken: {
      chainlinkAddress: '0x6f2bd4158f771e120d3692c45eb482c16f067dec',
      address: '0xa62d9d5ce0295f58c8185c057c668262d6549d10',
      decimals: 6,
      name: 'USDC',
    },
    managerToken: {
      address: '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B', // Fake Manager LP
    },
    sqrdToken: {
      address: '0x8A93d247134d91e0de6f96547cB0204e5BE8e5D8',
      decimals: 6,
      name: 'SQRD',
    },
    sqrdLpToken: {
      address: '0xb9bEECD1A582768711dE1EE7B0A1d582D9d72a6C',
      decimals: 6,
      name: 'SQRD_LP',
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
      chainlinkAddress: '0x9A37E1abFC430B9f5E204CA9294809c1AF37F697',
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
