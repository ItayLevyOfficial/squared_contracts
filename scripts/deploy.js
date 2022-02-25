const { ethers, upgrades } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { supportNativeToken, supportStableToken } = require('../test/utils')

const deployContract = async ({ contractName, params = [] }) => {
  const contract = await ethers.getContractFactory(contractName)
  const deployedContractFn = await contract.deploy(...params)
  const deployedContract = (await deployedContractFn.deployed())
  console.table({ [contractName]: deployedContract.address })
  return deployedContract
}

const deployPool = async ({ token, poolName = 'Pool' }) => {
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
  const fakeSQRD = await deployContract({ contractName: 'FakeSQRD' })
  const FakeSQRDLP = await deployContract({ contractName: 'FakeSQRDLP' })
  const FakeUSDC = await deployContract({ contractName: 'FakeUSDC' })
  const treasuryAddress = ethers.Wallet.createRandom().address
  // Need extra 8 zeros for the decimals.
  const maxTotalValue = 100_000_00000000
  const deployedContract = await deployContract({
    contractName: 'DefiRound',
    params: [selectedChain.nativeToken.address, treasuryAddress, maxTotalValue],
  })
  await supportNativeToken(deployedContract)
  await supportStableToken(deployedContract)
  await deployPool({ token: selectedChain.nativeToken, poolName: 'EthPool' })
  await deployPool({ token: selectedChain.stableToken })
  await deployPool({ token: selectedChain.sqrdToken })
  await deployPool({ token: selectedChain.sqrdLpToken })
}

main()
