const { ethers } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { supportNativeToken, supportStableToken } = require('../test/utils')
const { deployContract, deployPool } = require('./utils')

const deployAllContracts = async (stableTokenAddress) => {
  const fakeSQRD = await deployContract({ contractName: 'FakeSQRD' })
  const fakeSQRDLP = await deployContract({ contractName: 'FakeSQRDLP' })
  const actualStableTokenAddress =
    stableTokenAddress ??
    (await deployContract({ contractName: 'FakeUSDC' })).address
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
    stableTokenAddress: actualStableTokenAddress,
  })
  await deployPool({
    tokenName: selectedChain.nativeToken.name,
    tokenAddress: selectedChain.nativeToken.address,
    poolName: 'EthPool',
  })
  await deployPool({
    tokenName: selectedChain.stableToken.name,
    tokenAddress: actualStableTokenAddress,
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

module.exports = { deployAllContracts }
