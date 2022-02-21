const { ethers, upgrades } = require('hardhat')
const { selectedChain } = require('../test/chains')

const main = async () => {
  const PoolRound = await ethers.getContractFactory('Pool')

  const sqrdRound = await upgrades.deployProxy(
    PoolRound,
    [
      `${selectedChain.sqrdToken.address}`,
      `${selectedChain.manager.address}`,
      'SQRD',
      'SQRD',
    ],
    { initializer: 'initialize' }
  )
  await sqrdRound.deployed()
  const sqrdcontractAddress = (await sqrdRound.deployed()).address
  console.log('SQRD Contract:', sqrdcontractAddress)

  const sqrdLpRound = await upgrades.deployProxy(
    PoolRound,
    [
      `${selectedChain.sqrdLpToken.address}`,
      `${selectedChain.manager.address}`,
      'SQRD_LP',
      'SQRD_LP',
    ],
    { initializer: 'initialize' }
  )
  await sqrdLpRound.deployed()
  const sqrdLpcontractAddress = (await sqrdLpRound.deployed()).address
  console.log('SQRD LP Contract:', sqrdLpcontractAddress)

  const usdcRound = await upgrades.deployProxy(
    PoolRound,
    [
      `${selectedChain.stableToken.address}`,
      `${selectedChain.manager.address}`,
      'USDC',
      'USDC',
    ],
    { initializer: 'initialize' }
  )
  await usdcRound.deployed()
  const usdcContractAddress = (await usdcRound.deployed()).address
  console.log('USDC Contract:', usdcContractAddress)

  const EthPoolRound = await ethers.getContractFactory('EthPool')
  const ethPoolRound = await upgrades.deployProxy(
    EthPoolRound,
    [
      `${selectedChain.nativeToken.address}`,
      `${selectedChain.manager.address}`,
      'ETH',
      'ETH',
    ],
    { initializer: 'initialize' }
  )
  await ethPoolRound.deployed()
  const ethContractAddress = (await ethPoolRound.deployed()).address
  console.log('ETH Contract:', ethContractAddress)
}

main()
