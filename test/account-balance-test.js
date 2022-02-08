const { ethers } = require('hardhat')
const { addWethToSupportedTokens, deployLaunchContract, addUsdcToSupportedTokens } = require('./utils')

let defiRound

describe('Get account balance', () => {
  beforeEach(async () => {
    defiRound = await deployLaunchContract()
  })

  it('Should fetch account balance great', async () => {
    await addWethToSupportedTokens(defiRound)
    await addUsdcToSupportedTokens(defiRound)
    const address = ethers.Wallet.createRandom().address
    const accountData = await defiRound.getAccountData(address)
    console.log({ accountData })
  })

  it('Should fetch the account balance great with two supported tokens', async () => {})
})
