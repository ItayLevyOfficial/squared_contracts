const { ethers } = require('hardhat')

const deployToken = async (contract) => {
  const poolRound = await ethers.getContractFactory(contract)
  const PoolRound = await poolRound.deploy()
  const poolContractAddress = (await PoolRound.deployed()).address
  console.log(`${contract} address:`, poolContractAddress)
}

deployToken('FakeUSDC')
deployToken('FakeSQRD')
deployToken('FakeSQRDLP')
