const { ethers, upgrades } = require('hardhat')

const main = async () => {
  const SqrdRound = await ethers.getContractFactory('Pool')
  const sqrdRound = await upgrades.deployProxy(
    SqrdRound,
    [
      '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B', // Fake SQRD
      '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B',
      'SQRD',
      'SQRD',
    ],
    { initializer: 'initialize' }
  )
  await sqrdRound.deployed()
  const sqrdcontractAddress = (await sqrdRound.deployed()).address
  console.log('SQRD Contract', sqrdcontractAddress)

  const SqrdLpRound = await ethers.getContractFactory('Pool')
  const sqrdLpRound = await upgrades.deployProxy(
    SqrdLpRound,
    [
      '0xCA8c8688914e0F7096c920146cd0Ad85cD7Ae8b9', // Fake SQRD LP
      '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B',
      'SQRD_LP',
      'SQRD_LP',
    ],
    { initializer: 'initialize' }
  )
  await sqrdLpRound.deployed()
  const sqrdLpcontractAddress = (await sqrdLpRound.deployed()).address
  console.log('SQRD LP Contract', sqrdLpcontractAddress)

  const UsdcRound = await ethers.getContractFactory('Pool')
  const usdcRound = await upgrades.deployProxy(
    UsdcRound,
    [
      '0x5FeaeBfB4439F3516c74939A9D04e95AFE82C4ae', // Fake USDC
      '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B',
      'USDC',
      'USDC',
    ],
    { initializer: 'initialize' }
  )
  await usdcRound.deployed()
  const usdcContractAddress = (await usdcRound.deployed()).address
  console.log('USDC Contract', usdcContractAddress)

  const PoolRound = await ethers.getContractFactory('EthPool')
  const poolRound = await upgrades.deployProxy(
    PoolRound,
    [
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      '0xfcDB4564c18A9134002b9771816092C9693622e3',
      'ETH',
      'ETH',
    ],
    { initializer: 'initialize' }
  )
  await poolRound.deployed()
  const contractAddress = (await poolRound.deployed()).address
  console.log('ETH Contract:', contractAddress)
}

main()
