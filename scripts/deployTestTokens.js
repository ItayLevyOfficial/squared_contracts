const { ethers } = require('hardhat')

const main = async () => {
  const SqrdLpROUND = await ethers.getContractFactory('FakeSQRDLP')
  const sqrdLpROUND = await SqrdLpROUND.deploy()
  const sqrdLpContractAddress = (await sqrdLpROUND.deployed()).address
  console.log('Fake SQRD LP:', sqrdLpContractAddress)

  const SqrdRound = await ethers.getContractFactory('FakeSQRD')
  const sqrdRound = await SqrdRound.deploy()
  const sqrdContractAddress = (await sqrdRound.deployed()).address
  console.log('Fake SQRD:', sqrdContractAddress)

  const UsdcRound = await ethers.getContractFactory('FakeUSDC')
  const usdcRound = await UsdcRound.deploy()
  const usdcContractAddress = (await usdcRound.deployed()).address
  console.log('Fake USDC:', usdcContractAddress)
}

main()
