const { ethers, upgrades } = require('hardhat')
const { selectedChain } = require('../test/chains')

const deployContract = async ({ contractName, params = [] }) => {
  const contract = await ethers.getContractFactory(contractName)
  const deployedContractFn = await contract.deploy(...params)
  const deployedContract = await deployedContractFn.deployed()
  console.table({ [contractName]: deployedContract.address })
  return deployedContract
}

const deployPool = async ({ tokenName, tokenAddress, poolName = 'Pool' }) => {
  const PoolRound = await ethers.getContractFactory(poolName)
  const poolRound = await upgrades.deployProxy(
    PoolRound,
    [
      `${tokenAddress}`,
      `${selectedChain.managerToken.address}`,
      `${tokenName}`,
      `${tokenName}`,
    ],
    { initializer: 'initialize' },
  )
  await poolRound.deployed()
  const poolContractAddress = (await poolRound.deployed()).address
  console.table({ [`${tokenName} pool`]: poolContractAddress })
}

module.exports = { deployContract, deployPool }
