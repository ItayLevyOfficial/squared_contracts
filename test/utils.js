const { ethers } = require('hardhat')
const { selectedChain } = require('./tokens')
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const ethPrice = 2599_46882140
const maxTotalValue = ethPrice * 10

const addUsdcToSupportedTokens = async (defiRound) => {
  const usdcAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  const chainlinkAddress = '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6'
  const genesisPoolAddress = ethers.Wallet.createRandom().address
  await defiRound.addSupportedTokens([
    {
      token: usdcAddress,
      oracle: chainlinkAddress,
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
  supportNativeToken,addUsdcToSupportedTokens
}
