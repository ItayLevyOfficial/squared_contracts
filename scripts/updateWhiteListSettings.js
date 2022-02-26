const { configureHashedWhitelist } = require('../test/utils')
const { ethers } = require('hardhat')

const main = async () => {
  const hashedWhitelistedUsers = require('./hashedWhitelistedUsers.json').map(
    (buffer) => Buffer.from(buffer.data),
  )
  const MyContract = await ethers.getContractFactory('DefiRound')
  const launchContractAddress = '0xF32D39ff9f6Aa7a7A64d7a4F00a54826Ef791a55'
  const defiRound = await MyContract.attach(launchContractAddress)
  await configureHashedWhitelist(hashedWhitelistedUsers, defiRound)
}

main()
