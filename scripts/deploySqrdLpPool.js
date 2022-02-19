const { ethers, upgrades } = require('hardhat')

const main = async () => {
  const PoolRound = await ethers.getContractFactory('Pool')
  const poolRound = await upgrades.deployProxy(
    PoolRound,
    [
      '0x0ed64d01D0B4B655E410EF1441dD677B695639E7', // Fake SQRD_LP
      '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B',
      'SQRD',
      'SQRD',
    ],
    { initializer: 'initialize' }
  )
  await poolRound.deployed()
  const contractAddress = (await poolRound.deployed()).address
  console.table({ contractAddress })
}

main()
