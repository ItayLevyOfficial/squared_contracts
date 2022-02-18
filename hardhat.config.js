const { selectedChain } = require('./test/chains')
const { mnemonic } = require('./.secrets.json')
require('@nomiclabs/hardhat-waffle')
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

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.6.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  } ,
  defaultNetwork: 'bscTestnet',
  
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
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
    },
    bscMainnet: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
    },
  },
}
