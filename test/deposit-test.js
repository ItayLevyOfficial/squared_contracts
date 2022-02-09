const { expect } = require('chai')
const { ethers } = require('hardhat')
const { MerkleTree } = require('merkletreejs')
const { WETH, deployLaunchContract, addWethToSupportedTokens } = require('./utils')

const hashAddress = (address) =>
  Buffer.from(
    ethers.utils.solidityKeccak256(['address'], [address]).slice(2),
    'hex',
  )
let defiRound

const configureWhiteList = async (allowedUsers) => {
  const enabledUsersHashes = allowedUsers.map((user) => hashAddress(user))
  const tree = new MerkleTree(enabledUsersHashes, hashAddress, { sort: true })
  const root = tree.getRoot()
  const tx = await defiRound.configureWhitelist({ enabled: true, root: root })
  await tx.wait()
  return tree
}

describe('Deposit function', function () {
  beforeEach(async () => {
    defiRound = await deployLaunchContract()
  })

  it('Should add native token to the supported tokens list', async () => {
    await addWethToSupportedTokens(defiRound)
  })

  it('Should deposit funds successfully', async () => {
    const amountToDeposit = ethers.utils.parseEther('0.5')
    await addWethToSupportedTokens(defiRound)
    await defiRound.deposit({ token: WETH, amount: amountToDeposit }, [], {
      value: amountToDeposit,
    })
  })

  it('Should deposit funds successfully & verify the evm state', async () => {
    const amountToDeposit = ethers.utils.parseEther('0.5')
    await addWethToSupportedTokens(defiRound)
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
    const address1 = ethers.Wallet.createRandom().address
    const address2 = ethers.Wallet.createRandom().address
    const enabledUsers = [owner.address, address1, address2]
    const tree = await configureWhiteList(enabledUsers)
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
    const tree = await configureWhiteList(enabledUsers)
    const [owner] = await ethers.getSigners()
    const proof = tree.getProof(owner.address)
    await addWethToSupportedTokens(defiRound)

    await expect(
      defiRound.deposit({ token: WETH, amount: amountToDeposit }, proof, {
        value: amountToDeposit,
      }),
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
    const tree = await configureWhiteList(enabledUsers)
    const proofObj = tree
      .getProof(hashAddress(owner.address))
      .map((pr) => pr.data)
    await addWethToSupportedTokens(defiRound)
    await defiRound.deposit(
      { token: WETH, amount: amountToDeposit },
      proofObj,
      {
        value: amountToDeposit,
      },
    )
    const accountData = (await defiRound.getAccountData(owner.address))[0]

    expect(accountData.token).to.equal(WETH)
    expect(accountData.currentBalance).to.equal(amountToDeposit)
    expect(accountData.initialDeposit).to.equal(amountToDeposit)
  })

  it('Should verify the contract state after two deposits', async () => {
    const depositFunds = async (amountToDeposit) => {
      await defiRound.deposit({ token: WETH, amount: amountToDeposit }, [], {
        value: amountToDeposit,
      })
    }
    const amountToDeposit = ethers.utils.parseEther('0.000005')
    const [owner] = await ethers.getSigners()
    await addWethToSupportedTokens(defiRound)
    await depositFunds(amountToDeposit)
    let accountData = (await defiRound.getAccountData(owner.address))[0]

    expect(accountData.token).to.equal(WETH)
    expect(accountData.currentBalance).to.equal(amountToDeposit)
    expect(accountData.initialDeposit).to.equal(amountToDeposit)

    await depositFunds(amountToDeposit)
    accountData = (await defiRound.getAccountData(owner.address))[0]

    expect(accountData.token).to.equal(WETH)
    expect(accountData.currentBalance).to.equal(amountToDeposit * 2)
    expect(accountData.initialDeposit).to.equal(amountToDeposit * 2)
  })

  it('Should reach the maxTotalValue great', async () => {
    const amountToDeposit = ethers.utils.parseEther('10.1')
    await addWethToSupportedTokens(defiRound)
    await defiRound.deposit({ token: WETH, amount: amountToDeposit }, [], {
      value: amountToDeposit,
    })
    const secondAmountToDeposit = ethers.utils.parseEther('0.1')
    await expect(
      defiRound.deposit({ token: WETH, amount: secondAmountToDeposit }, [], {
        value: secondAmountToDeposit,
      }),
    ).to.be.revertedWith('DEPOSITS_LOCKED')
  })
})

module.exports = { deployLaunchContract, defiRound }
