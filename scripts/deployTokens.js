const { ethers } = require('hardhat')

const main = async (contract) => {
  const poolRound = await ethers.getContractFactory(contract)
  const PoolRound = await poolRound.deploy()
  const poolContractAddress = (await PoolRound.deployed()).address
  console.log(`${contract} address:`, poolContractAddress)
}

main('FakeUSDC')
main('FakeSQRD')
main('FakeSQRDLP')
