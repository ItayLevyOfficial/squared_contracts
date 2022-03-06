const { ethers } = require('hardhat')

const deployContract = async ({ contractName, params = [] }) => {
  const contract = await ethers.getContractFactory(contractName)
  const deployedContractFn = await contract.deploy(...params)
  const deployedContract = await deployedContractFn.deployed()
  console.table({ [contractName]: deployedContract.address })
  return deployedContract
}

module.exports = { deployContract }
