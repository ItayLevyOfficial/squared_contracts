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
      address: '0x5b3e2bc1da86ff6235d9ead4504d598cae77dbcb',
      chainlinkAddress: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526',
    },
    stableToken: {
      address: '0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47',
      chainlinkAddress: '0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa',
      decimals: 18,
    },
  },
}

module.exports = { selectedChain: chains.bsc, chains }
