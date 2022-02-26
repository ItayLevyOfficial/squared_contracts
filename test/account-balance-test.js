const { ethers } = require('hardhat')
const { selectedChain } = require('./chains')
const {
  deployLaunchContract,
  supportNativeToken,
  supportStableToken,
} = require('./utils')

let defiRound

describe('Get account balance', () => {
  beforeEach(async () => {
    defiRound = await deployLaunchContract()
  })

  it('Should fetch account balance great', async () => {
    await supportNativeToken(defiRound)
    await supportStableToken({ defiRoundContract: defiRound })
    const amountToDeposit = ethers.utils.parseEther('0.5')
    await defiRound.deposit(
      { token: selectedChain.nativeToken.address, amount: amountToDeposit },
      [],
      {
        value: amountToDeposit,
      },
    )

    const [owner] = await ethers.getSigners()
    const accountData = await defiRound.getAccountData(owner.address)

    console.log({ accountData })
  })

  it('Should fetch the account balance great with two supported tokens', async () => {})
})
