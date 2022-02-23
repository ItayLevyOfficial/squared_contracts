const { ethers, upgrades } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { supportNativeToken, supportStableToken } = require('../test/utils')

const deployContract = async ({ contractName }) => {
  const contract = await ethers.getContractFactory(contractName)
  const deployedContract = await contract.deploy()
  const deployedContractAddress = (await deployedContract.deployed()).address
  console.table({ contractName: deployedContractAddress })
}

const main = async () => {
  const DefiRound = await ethers.getContractFactory('DefiRound')
  const treasuryWallet = ethers.Wallet.createRandom()
  const treasury = treasuryWallet.address
  // Need extra 8 zeros for the decimals.
  const maxTotalValue = 100_000_00000000

  const defiRound = await DefiRound.deploy(
    selectedChain.nativeToken.address,
    treasury,
    maxTotalValue,
  )
  const contractAddress = (await defiRound.deployed()).address
  console.log('Launch Contract:', contractAddress)
  await supportNativeToken(defiRound)
  await supportStableToken(defiRound)

  const deployPool = async (chain, tokenName) => {
    const PoolRound = await ethers.getContractFactory('Pool')

    const poolRound = await upgrades.deployProxy(
      PoolRound,
      [
        `${chain.address}`,
        `${selectedChain.managerToken.address}`,
        `${tokenName}`,
        `${tokenName}`,
      ],
      { initializer: 'initialize' },
    )
    await poolRound.deployed()
    const poolContractAddress = (await poolRound.deployed()).address
    console.log(`${tokenName} Contract:`, poolContractAddress)
  }

  const deployEthPool = async () => {
    const EthPoolRound = await ethers.getContractFactory('EthPool')
    const ethPoolRound = await upgrades.deployProxy(
      EthPoolRound,
      [
        `${selectedChain.nativeToken.address}`,
        `${selectedChain.managerToken.address}`,
        'ETH',
        'ETH',
      ],
      { initializer: 'initialize' },
    )
    await ethPoolRound.deployed()
    const ethContractAddress = (await ethPoolRound.deployed()).address
    console.log('ETH Contract:', ethContractAddress)
  }

  deployEthPool()
  deployPool(selectedChain.stableToken, 'USDC')
  deployPool(selectedChain.sqrdToken, 'SQRD')
  deployPool(selectedChain.sqrdLpToken, 'SQRD_LP')
}

main()
