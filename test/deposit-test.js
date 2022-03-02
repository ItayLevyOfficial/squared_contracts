const { expect } = require('chai')
const { ethers } = require('hardhat')
const { selectedChain } = require('./chains')
const {
  hashAddress,
  deployLaunchContract,
  supportNativeToken,
  configureWhiteList
} = require('./utils')

let defiRound


describe('Deposit function', function () {
  beforeEach(async () => {
    defiRound = await deployLaunchContract()
  })

  it('Should add native token to the supported tokens list', async () => {
    await supportNativeToken(defiRound)
  })

  it('Should deposit funds successfully', async () => {
    const amountToDeposit = ethers.utils.parseEther('0.5')
    await supportNativeToken(defiRound)
    await defiRound.deposit(
      { token: selectedChain.nativeToken.address, amount: amountToDeposit },
      [],
      {
        value: amountToDeposit,
      },
    )
  })

  it('Should deposit funds successfully & verify the evm state', async () => {
    const amountToDeposit = ethers.utils.parseEther('0.5')
    await supportNativeToken(defiRound)
    const depositTx = await defiRound.deposit(
      { token: selectedChain.nativeToken.address, amount: amountToDeposit },
      [],
      { value: amountToDeposit },
    )
    await depositTx.wait()
    const [owner] = await ethers.getSigners()
    const accountData = (await defiRound.getAccountData(owner.address))[0]

    expect(accountData.token).to.equal(selectedChain.nativeToken.address)
    expect(accountData.currentBalance).to.equal(amountToDeposit)
    expect(accountData.initialDeposit).to.equal(amountToDeposit)
  })

  it('Enables the whitelist settings successfully', async () => {
    const [owner] = await ethers.getSigners()
    const address1 = ethers.Wallet.createRandom().address
    const address2 = ethers.Wallet.createRandom().address
    const enabledUsers = [owner.address, address1, address2]
    const tree = await configureWhiteList(enabledUsers, defiRound)
    const whitelistSettings = await defiRound.whitelistSettings()
    const root = whitelistSettings.root
    const isEnabled = whitelistSettings.enabled

    expect(isEnabled).to.equal(true)
    expect(root).to.equal('0x' + tree.getRoot().toString('hex'))
  })

  it('Fail to deposit funds with a non whitelisted user', async () => {
    const amountToDeposit = ethers.utils.parseEther('0.5')
    const address1 = ethers.Wallet.createRandom().address
    const enabledUsers = [address1]
    const tree = await configureWhiteList(enabledUsers, defiRound)
    const [owner] = await ethers.getSigners()
    const proof = tree.getProof(owner.address)
    await supportNativeToken(defiRound)

    await expect(
      defiRound.deposit(
        { token: selectedChain.nativeToken.address, amount: amountToDeposit },
        proof,
        {
          value: amountToDeposit,
        },
      ),
    ).to.be.revertedWith('PROOF_INVALID')
  })

  it('Should deposit funds successfully from a whitelisted address', async () => {
    const amountToDeposit = ethers.utils.parseEther('0.5')
    const address1 = ethers.Wallet.createRandom().address
    const address2 = ethers.Wallet.createRandom().address
    const address3 = ethers.Wallet.createRandom().address
    const [owner] = await ethers.getSigners()
    const currentAddress = owner.address
    const enabledUsers = [currentAddress, address1]
    const tree = await configureWhiteList(enabledUsers, defiRound)
    const proofObj = tree
      .getProof(hashAddress(owner.address))
      .map((pr) => pr.data)
    await supportNativeToken(defiRound)
    await defiRound.deposit(
      { token: selectedChain.nativeToken.address, amount: amountToDeposit },
      proofObj,
      {
        value: amountToDeposit,
      },
    )
    const accountData = (await defiRound.getAccountData(owner.address))[0]

    expect(accountData.token).to.equal(selectedChain.nativeToken.address)
    expect(accountData.currentBalance).to.equal(amountToDeposit)
    expect(accountData.initialDeposit).to.equal(amountToDeposit)
  })

  it('Should verify the contract state after two deposits', async () => {
    const depositFunds = async (amountToDeposit) => {
      await defiRound.deposit(
        { token: selectedChain.nativeToken.address, amount: amountToDeposit },
        [],
        {
          value: amountToDeposit,
        },
      )
    }
    const amountToDeposit = ethers.utils.parseEther('0.000005')
    const [owner] = await ethers.getSigners()
    await supportNativeToken(defiRound)
    await depositFunds(amountToDeposit)
    let accountData = (await defiRound.getAccountData(owner.address))[0]

    expect(accountData.token).to.equal(selectedChain.nativeToken.address)
    expect(accountData.currentBalance).to.equal(amountToDeposit)
    expect(accountData.initialDeposit).to.equal(amountToDeposit)

    await depositFunds(amountToDeposit)
    accountData = (await defiRound.getAccountData(owner.address))[0]

    expect(accountData.token).to.equal(selectedChain.nativeToken.address)
    expect(accountData.currentBalance).to.equal(amountToDeposit * 2)
    expect(accountData.initialDeposit).to.equal(amountToDeposit * 2)
  })

  it('Should reach the maxTotalValue great', async () => {
    const amountToDeposit = ethers.utils.parseEther('10.1')
    await supportNativeToken(defiRound)
    await defiRound.deposit(
      { token: selectedChain.nativeToken.address, amount: amountToDeposit },
      [],
      {
        value: amountToDeposit,
      },
    )
    const secondAmountToDeposit = ethers.utils.parseEther('0.1')
    await expect(
      defiRound.deposit(
        {
          token: selectedChain.nativeToken.address,
          amount: secondAmountToDeposit,
        },
        [],
        {
          value: secondAmountToDeposit,
        },
      ),
    ).to.be.revertedWith('DEPOSITS_LOCKED')
  })
})

module.exports = { deployLaunchContract, defiRound }
