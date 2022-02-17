const { ethers, upgrades } = require('hardhat')

const main = async () => {
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
  console.table({ contractAddress })
}

main()
