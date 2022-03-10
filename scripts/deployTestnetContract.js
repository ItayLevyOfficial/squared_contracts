const { ethers } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { supportNativeToken, supportStableToken } = require('../test/utils')
const { deployContract, deployPool } = require('./utils')

const main = async () => {
  const treasuryAddress = ethers.Wallet.createRandom().address
  // Need extra 8 zeros for the chainlink usd response decimals.
  const maxTotalValue = 100_000_00000000
  const deployedContract = await deployContract({
    contractName: 'DefiRound',
    params: [selectedChain.nativeToken.address, treasuryAddress, maxTotalValue],
  })
  await supportNativeToken(deployedContract)
  await supportStableToken({
    defiRoundContract: deployedContract,
    stableTokenAddress: selectedChain.stableToken.address,
  })
  const fakeSQRD = await deployContract({ contractName: 'FakeSQRD' })
  const fakeSQRDLP = await deployContract({ contractName: 'FakeSQRDLP' })
  await deployPool({
    tokenName: selectedChain.nativeToken.name,
    tokenAddress: selectedChain.nativeToken.address,
    poolName: 'EthPool',
  })
  await deployPool({
    tokenName: selectedChain.stableToken.name,
    tokenAddress: selectedChain.stableToken.address,
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
