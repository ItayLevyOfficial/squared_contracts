const { ethers } = require('hardhat')
const { deployLaunchContract } = require('./utils')

let defiRound

describe('Get account balance', () => {
  beforeEach(async () => {
    defiRound = await deployLaunchContract()
  })

  it('Should fetch account balance great', async () => {
    const address = ethers.Wallet.createRandom().address
    const accountData = await defiRound.getAccountData(address)
    console.log({accountData});
  })
})
