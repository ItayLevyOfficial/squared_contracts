const { ethers } = require('hardhat')

const main = async () => {
  const DefiRound = await ethers.getContractFactory('FakeUSDC')

  const defiRound = await DefiRound.deploy()
  const contractAddress = (await defiRound.deployed()).address
  console.table({ contractAddress })
}

main()
