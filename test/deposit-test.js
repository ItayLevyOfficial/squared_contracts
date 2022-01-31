const { expect } = require('chai')
const { ethers } = require('hardhat')
const { MerkleTree } = require ('merkletreejs')

const hashAddress = (address) => Buffer.from(ethers.utils.solidityKeccak256(['address'], [address]).slice(2), 'hex')

let defiRound
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

const addWethToSupportedTokens = async () => {
  const ethereumChainlinkAddress = '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'
  const genesisPoolAddress = '0x5450D2d0CFdF107c0698B52596f3488cF88B0252'

  const tx = await defiRound.addSupportedTokens([
    {
      token: WETH,
      oracle: ethereumChainlinkAddress,
      genesis: genesisPoolAddress,
      maxLimit: ethers.utils.parseEther('100'),
    },
  ])
  await tx.wait()
}

const configureWhiteList = async (allowedUsers) => {
  const enabledUsersHashes = allowedUsers.map((user) => hashAddress(user))
  const tree = new MerkleTree(enabledUsersHashes, hashAddress, {sort: true})
  const root = tree.getRoot()
  const tx = await defiRound.configureWhitelist({ enabled: true, root: root })
  await tx.wait()
  return tree
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
    await addWethToSupportedTokens()

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
      .map(pr => pr.data)
    await addWethToSupportedTokens()
    await defiRound.deposit(
      { token: WETH, amount: amountToDeposit}, proofObj,
      {
        value: amountToDeposit,
      },
    )
    const accountData = (await defiRound.getAccountData(owner.address))[0]

    expect(accountData.token).to.equal(WETH)
    expect(accountData.currentBalance).to.equal(amountToDeposit)
    expect(accountData.initialDeposit).to.equal(amountToDeposit)
  })
})
