const { ethers } = require('hardhat')
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const ethPrice = 2599_46882140
const maxTotalValue = ethPrice * 10

const addWethToSupportedTokens = async (defiRound) => {
  const ethereumChainlinkAddress = '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'
  const genesisPoolAddress = '0x5450D2d0CFdF107c0698B52596f3488cF88B0252'

  await defiRound.addSupportedTokens([
    {
      token: WETH,
      oracle: ethereumChainlinkAddress,
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
  WETH, ethPrice, maxTotalValue, deployLaunchContract, addWethToSupportedTokens
}