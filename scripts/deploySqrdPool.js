const { ethers, upgrades } = require('hardhat')

const main = async () => {
  const PoolRound = await ethers.getContractFactory('Pool')
  const poolRound = await upgrades.deployProxy(
    PoolRound,
    [
      '0x638A246F0Ec8883eF68280293FFE8Cfbabe61B44', // Fake SQRD
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
