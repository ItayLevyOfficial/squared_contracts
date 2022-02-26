const { ethers, upgrades } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { supportNativeToken, supportStableToken } = require('../test/utils')

const deployContract = async ({ contractName, params = [] }) => {
  const contract = await ethers.getContractFactory(contractName)
  const deployedContractFn = await contract.deploy(...params)
  const deployedContract = await deployedContractFn.deployed()
  console.table({ [contractName]: deployedContract.address })
  return deployedContract
}

const deployPool = async ({ tokenName, tokenAddress, poolName = 'Pool' }) => {
  const PoolRound = await ethers.getContractFactory(poolName)
  const poolRound = await upgrades.deployProxy(
    PoolRound,
    [
      `${tokenAddress}`,
      `${selectedChain.managerToken.address}`,
      `${tokenName}`,
      `${tokenName}`,
    ],
    { initializer: 'initialize' },
  )
  await poolRound.deployed()
  const poolContractAddress = (await poolRound.deployed()).address
  console.table({ [`${tokenName} pool`]: poolContractAddress })
}

const main = async () => {
  const fakeSQRD = await deployContract({ contractName: 'FakeSQRD' })
  const fakeSQRDLP = await deployContract({ contractName: 'FakeSQRDLP' })
  const fakeUSDC = await deployContract({ contractName: 'FakeUSDC' })
  const treasuryAddress = ethers.Wallet.createRandom().address
  // Need extra 8 zeros for the decimals.
  const maxTotalValue = 100_000_00000000
  const deployedContract = await deployContract({
    contractName: 'DefiRound',
    params: [selectedChain.nativeToken.address, treasuryAddress, maxTotalValue],
  })
  await supportNativeToken(deployedContract)
  await supportStableToken({
    defiRoundContract: deployedContract,
    stableTokenAddress: fakeUSDC.address,
  })
  await deployPool({
    tokenName: selectedChain.nativeToken.name,
    tokenAddress: selectedChain.token.address,
    poolName: 'EthPool',
  })
  await deployPool({
    tokenName: selectedChain.stableToken.name,
    tokenAddress: fakeUSDC.address,
  })
  await deployPool({
    tokenName: selectedChain.sqrdToken.name,
    tokenAddress: fakeSQRD.address,
  })
  await deployPool({
    tokenName: selectedChain.sqrdLpToken.name,
    tokenAddress: fakeSQRDLP.address,
  })
}

main()
