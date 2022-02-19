const { ethers, upgrades } = require('hardhat')

const main = async () => {
  const PoolRound = await ethers.getContractFactory('EthPool')
  const poolRound = await upgrades.deployProxy(
    PoolRound,
    [
      '0xCA8c8688914e0F7096c920146cd0Ad85cD7Ae8b9',
      '0xfcDB4564c18A9134002b9771816092C9693622e3',
      'ETH',
      'ETH',
    ],
    { initializer: 'initialize' }
  )
  await poolRound.deployed()
  const contractAddress = (await poolRound.deployed()).address
  console.table({ contractAddress })
}

main()
