const { ethers } = require('hardhat')
const { selectedChain } = require('./chains')
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const ethPrice = 2599_46882140
const maxTotalValue = ethPrice * 10

const supportStableToken = async (defiRound) => {
  const stableToken = selectedChain.stableToken
  const genesisPoolAddress = ethers.Wallet.createRandom().address

  await defiRound.addSupportedTokens([
    {
      token: stableToken.address,
      oracle: stableToken.chainlinkAddress,
      genesis: genesisPoolAddress,
      maxLimit: ethers.utils.parseEther('100'),
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
  return await DefiRound.deploy(WETH, treasury, maxTotalValue)
}

module.exports = {
  WETH,
  ethPrice,
  maxTotalValue,
  deployLaunchContract,
  supportNativeToken,supportStableToken
}
