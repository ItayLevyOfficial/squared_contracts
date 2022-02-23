const { ethers, upgrades } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { supportNativeToken, supportStableToken } = require('../test/utils')

const deployContract = async ({ contractName, params }) => {
  const contract = await ethers.getContractFactory(contractName)
  const deployedContract = await contract.deploy(...params)
  const deployedContractAddress = (await deployedContract.deployed()).address
  console.table({ contractName: deployedContractAddress })
  return deployedContract
}

const main = async () => {
  const treasuryAddress = ethers.Wallet.createRandom().address
  // Need extra 8 zeros for the decimals.
  const maxTotalValue = 100_000_00000000
  const deployedContract = await deployContract({
    contractName: 'DefiRound',
    params: [selectedChain.nativeToken.address, treasuryAddress, maxTotalValue]
  })
  await supportNativeToken(deployedContract)
  await supportStableToken(deployedContract)

  const deployPool = async (chain, tokenName) => {
    const PoolRound = await ethers.getContractFactory('Pool')

    const poolRound = await upgrades.deployProxy(
      PoolRound,
      [
        `${chain.address}`,
        `${selectedChain.managerToken.address}`,
        `${tokenName}`,
        `${tokenName}`,
      ],
      { initializer: 'initialize' },
    )
    await poolRound.deployed()
    const poolContractAddress = (await poolRound.deployed()).address
    console.log(`${tokenName} Contract:`, poolContractAddress)
  }

  const deployEthPool = async () => {
    const EthPoolRound = await ethers.getContractFactory('EthPool')
    const ethPoolRound = await upgrades.deployProxy(
      EthPoolRound,
      [
        `${selectedChain.nativeToken.address}`,
        `${selectedChain.managerToken.address}`,
        'ETH',
        'ETH',
      ],
      { initializer: 'initialize' },
    )
    await ethPoolRound.deployed()
    const ethContractAddress = (await ethPoolRound.deployed()).address
    console.log('ETH Contract:', ethContractAddress)
  }

  deployEthPool()
  deployPool(selectedChain.stableToken, 'USDC')
  deployPool(selectedChain.sqrdToken, 'SQRD')
  deployPool(selectedChain.sqrdLpToken, 'SQRD_LP')
}

main()
