const { ethers, upgrades } = require('hardhat')
const { selectedChain } = require('../test/chains')

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
    { initializer: 'initialize' }
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
    { initializer: 'initialize' }
  )
  await ethPoolRound.deployed()
  const ethContractAddress = (await ethPoolRound.deployed()).address
  console.log('ETH Contract:', ethContractAddress)
}

deployPool(selectedChain.sqrdToken, 'SQRD')
deployPool(selectedChain.sqrdLpToken, 'SQRD_LP')
deployPool(selectedChain.stableToken, 'USDC')
deployEthPool()
