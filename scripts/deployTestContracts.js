const { ethers, upgrades } = require('hardhat')

const main = async () => {
  const SqrdRound = await ethers.getContractFactory('Pool')
  const sqrdRound = await upgrades.deployProxy(
    SqrdRound,
    [
      '0x40918Ba7f132E0aCba2CE4de4c4baF9BD2D7D849', // Fake SQRD
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
      '0x8A93d247134d91e0de6f96547cB0204e5BE8e5D8', // Fake SQRD LP
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
      '0xF32D39ff9f6Aa7a7A64d7a4F00a54826Ef791a55', // Fake USDC
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
