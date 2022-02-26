const { BigNumber } = require('ethers')
const { ethers } = require('hardhat')
const { selectedChain } = require('./chains')
const ethPrice = 2599_46882140
const maxTotalValue = ethPrice * 10

const formatNumber = (number, decimals) =>
  BigNumber.from(number).mul(BigNumber.from(10).pow(BigNumber.from(decimals)))

const supportStableToken = async ({
  defiRoundContract,
  // Need this param for the deploy script, which generates different stable token addresses each run.
  stableTokenAddress = selectedChain.stableToken.address,
}) => {
  const stableToken = selectedChain.stableToken
  const genesisPoolAddress = ethers.Wallet.createRandom().address

  await defiRoundContract.addSupportedTokens([
    {
      token: stableTokenAddress,
      oracle: stableToken.chainlinkAddress,
      genesis: genesisPoolAddress,
      maxLimit: formatNumber(100_000, stableToken.decimals),
    },
  ])
}

const supportNativeToken = async (defiRound) => {
  const nativeToken = selectedChain.nativeToken
  const genesisPoolAddress = ethers.Wallet.createRandom().address

  await defiRound.addSupportedTokens([
    {
      token: nativeToken.address,
      oracle: nativeToken.chainlinkAddress,
      genesis: genesisPoolAddress,
      maxLimit: ethers.utils.parseEther('100'),
    },
  ])
}

const deployLaunchContract = async () => {
  const DefiRound = await ethers.getContractFactory('DefiRound')
  const treasuryWallet = ethers.Wallet.createRandom()
  const treasury = treasuryWallet.address
  return await DefiRound.deploy(
    selectedChain.nativeToken.address,
    treasury,
    maxTotalValue,
  )
}

const hashAddress = (address) =>
  Buffer.from(
    ethers.utils.solidityKeccak256(['address'], [address]).slice(2),
    'hex',
  )

module.exports = {
  ethPrice,
  maxTotalValue,
  deployLaunchContract,
  supportNativeToken,
  supportStableToken,
  hashAddress
}
