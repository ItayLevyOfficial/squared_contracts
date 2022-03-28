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
  kovan: {
    nativeToken: {
      address: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
      chainlinkAddress: '0x9326BFA02ADD2366b30bacB125260Af641031331',
      decimals: 18,
      name: 'ETH',
    },
    stableToken: {
      address: '0xdCFaB8057d08634279f8201b55d311c2a67897D2',
      chainlinkAddress: '0x9211c6b3BF41A10F78539810Cf5c64e1BB78Ec60',
      decimals: 6,
      name: 'USDC',
    },
    sqrdToken: {
      address: '0x48B51bC25Aa41C1c6CeBc1797BF4FF5411354E5E',
      decimals: 6,
      name: 'SQRD',
    },
    sqrdLpToken: {
      address: '0x0a863a4A66fBf86fb4D1F737945C836F571C403F',
      decimals: 6,
      name: 'SQRD_LP',
    },
    managerToken: {
      address: '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B', // Fake Manager LP
    },
  },
  ethereum: {
    launchContractAddress: '0xF32D39ff9f6Aa7a7A64d7a4F00a54826Ef791a55',
    nativeToken: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      chainlinkAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
      decimals: 18,
      name: 'ETH',
    },
    stableToken: {
      address: '0x40918Ba7f132E0aCba2CE4de4c4baF9BD2D7D849',
      chainlinkAddress: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
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
  moonbase: {
    nativeToken: {
      address: '0x1436aE0dF0A8663F18c0Ec51d7e2E46591730715',
      chainlinkAddress: '0x3669da30c33D27A6A579548fCfc345fE5dEdda6e',
      decimals: 18,
      name: 'DEV',
    },
    stableToken: {
      address: '0xdCFaB8057d08634279f8201b55d311c2a67897D2',
      chainlinkAddress: '0x3669da30c33D27A6A579548fCfc345fE5dEdda6e',
      decimals: 6,
      name: 'USDC',
    },
    sqrdToken: {
      address: '0x48B51bC25Aa41C1c6CeBc1797BF4FF5411354E5E',
      decimals: 6,
      name: 'SQRD',
    },
    sqrdLpToken: {
      address: '0x0a863a4A66fBf86fb4D1F737945C836F571C403F',
      decimals: 6,
      name: 'SQRD_LP',
    },
    managerToken: {
      address: '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B', // Fake Manager LP
    },
  },
}

module.exports = { selectedChain: chains.moonbase }
