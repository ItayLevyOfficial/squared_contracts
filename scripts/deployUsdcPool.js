const { ethers, upgrades } = require('hardhat')

const main = async () => {
  const PoolRound = await ethers.getContractFactory('Pool')
  const poolRound = await upgrades.deployProxy(
    PoolRound,
    [
      '0xfcDB4564c18A9134002b9771816092C9693622e3', // Fake USDC
      '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B',
      'USDC',
      'USDC',
    ],
    { initializer: 'initialize' }
  )
  await poolRound.deployed()
  const contractAddress = (await poolRound.deployed()).address
  console.table({ contractAddress })
}

main()
