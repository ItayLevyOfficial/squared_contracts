const { configureHashedWhitelist } = require('../test/utils')
const { ethers } = require('hardhat')
const { selectedChain } = require('../test/chains')

const main = async () => {
  const hashedWhitelistedUsers = require('./hashedWhitelistedUsers.json').map(
    (buffer) => Buffer.from(buffer.data),
  )
  const MyContract = await ethers.getContractFactory('DefiRound')
  const defiRound = await MyContract.attach(selectedChain.launchContractAddress)
  await configureHashedWhitelist(hashedWhitelistedUsers, defiRound)
}

main()
