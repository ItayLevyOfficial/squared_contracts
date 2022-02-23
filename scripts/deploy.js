const { ethers, upgrades } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { supportNativeToken, supportStableToken } = require('../test/utils')

const deployContract = async ({ contractName, params = [] }) => {
  const contract = await ethers.getContractFactory(contractName)
  const deployedContract = await contract.deploy(...params)
  const deployedContractAddress = (await deployedContract.deployed()).address
  console.table({ [contractName]: deployedContractAddress })
  return deployedContract
}

const deployPool = async (token, poolName = 'Pool') => {
  const PoolRound = await ethers.getContractFactory(poolName)

  const poolRound = await upgrades.deployProxy(
    PoolRound,
    [
      `${token.address}`,
      `${selectedChain.managerToken.address}`,
      `${token.name}`,
      `${token.name}`,
    ],
    { initializer: 'initialize' },
  )
  await poolRound.deployed()
  const poolContractAddress = (await poolRound.deployed()).address
  console.table({ [`${token.name} pool`]: poolContractAddress })
}

const main = async () => {
  await deployContract({ contractName: 'FakeUSDC' })
  const treasuryAddress = ethers.Wallet.createRandom().address
  // Need extra 8 zeros for the decimals.
  const maxTotalValue = 100_000_00000000
  const deployedContract = await deployContract({
    contractName: 'DefiRound',
    params: [selectedChain.nativeToken.address, treasuryAddress, maxTotalValue],
  })
  await supportNativeToken(deployedContract)
  await supportStableToken(deployedContract)

  deployPool({ token: selectedChain.nativeToken, poolName: 'EthPool' })
  deployPool({ token: selectedChain.stableToken })
  deployPool({ token: selectedChain.sqrdToken })
  deployPool({ token: selectedChain.sqrdLpToken })
}

main()
