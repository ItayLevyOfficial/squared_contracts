require('@nomiclabs/hardhat-waffle')
require('@openzeppelin/hardhat-upgrades')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const testingPrivateKey = `0eeadbe03ac4338e59d7c7a4d04e70519484b5608690470b31d05811fa90ee9a`

const optimizerSettings = {
  optimizer: {
    enabled: true,
    runs: 1,
  },
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.6.11',
        settings: optimizerSettings,
      },
      {
        version: '0.6.12',
        settings: optimizerSettings,
      },
      {
        version: '0.7.6',
        settings: optimizerSettings,
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
      forking: {
        url:
          'https://eth-mainnet.alchemyapi.io/v2/2wzUWNwC9bpWNB5tNUznTTL0yogzqamW',
        blockNumber: 14101114,
      },
    },
    harmonyTestnet: {
      url: `https://api.s0.b.hmny.io/`,
      accounts: [testingPrivateKey],
    },
    kovan: {
      url: 'https://kovan.infura.io/v3/fd7b0a37ee4249039dbf93ac592eb34a',
      accounts: [testingPrivateKey],
    },
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      accounts: [testingPrivateKey],
    },
  },
}
