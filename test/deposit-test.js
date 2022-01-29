const { expect } = require('chai')
const { ethers } = require('hardhat')

let defiRound
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

const addWethToSupportedTokens = async () => {
  const ethereumChainlinkAddress = '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'
  const genesisPoolAddress = '0x5450D2d0CFdF107c0698B52596f3488cF88B0252'

  await defiRound.addSupportedTokens([
    {
      token: WETH,
      oracle: ethereumChainlinkAddress,
      genesis: genesisPoolAddress,
      maxLimit: ethers.utils.parseEther('100'),
    },
  ])
}

describe('Deposit function', function () {
  beforeEach(async () => {
    const DefiRound = await ethers.getContractFactory('DefiRound')
    const treasuryWallet = ethers.Wallet.createRandom()
    const treasury = treasuryWallet.address

    defiRound = await DefiRound.deploy(WETH, treasury, 1000)
    await defiRound.deployed()
  })

  it('Should add ETH to the supported tokens list', async () => {
    await addWethToSupportedTokens()
  })

  it('Should deposit funds successfully', async () => {
    const amountToDeposit = ethers.utils.parseEther('0.5')
    await addWethToSupportedTokens()
    await defiRound.deposit({ token: WETH, amount: amountToDeposit }, [], {
      value: amountToDeposit,
    })
  })

  it('Should deposit funds successfully & verify the evm state', async () => {
    const amountToDeposit = ethers.utils.parseEther('0.5')
    await addWethToSupportedTokens()
    const depositTx = await defiRound.deposit(
      { token: WETH, amount: amountToDeposit },
      [],
      { value: amountToDeposit },
    )
    await depositTx.wait()
    const [owner] = await ethers.getSigners()
    const accountData = (await defiRound.getAccountData(owner.address))[0]

    expect(accountData.token).to.equal(WETH)
    expect(accountData.currentBalance).to.equal(amountToDeposit)
    expect(accountData.initialDeposit).to.equal(amountToDeposit)
  })

  it('Enables the whitelist settings successfully', async () => {
    const [owner] = await ethers.getSigners()
    const enabledUsers = []
    
    await defiRound.configureWhitelist({ enabled: true })
  })
})
