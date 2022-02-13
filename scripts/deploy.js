const { ethers, network } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { supportNativeToken, supportStableToken } = require('../test/utils')

const main = async () => {
  const DefiRound = await ethers.getContractFactory('DefiRound')
  const treasuryWallet = ethers.Wallet.createRandom()
  const treasury = treasuryWallet.address
  // Need extra 8 zeros for the decimals.
  const maxTotalValue = 100_000_00000000

  const defiRound = await DefiRound.deploy(selectedChain.nativeToken.address, treasury, maxTotalValue)
  const contractAddress = (await defiRound.deployed()).address
  console.table({ contractAddress })
  await supportNativeToken(defiRound)
  await supportStableToken(defiRound)
  const myMetamaskWalletAddress = '0xA3318B6027DC8fC382F990Bee9d2308E2ea3a388'
  await network.provider.send("hardhat_setBalance", [
    myMetamaskWalletAddress,
    ethers.utils.parseEther('10').toHexString()
  ])
  const erc20abi = require('./erc20abi.json')
  const stableTokenAddress = selectedChain.stableToken.address
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [myMetamaskWalletAddress],
  })
  const signer = await ethers.getSigner(myMetamaskWalletAddress)
  const erc20 = new ethers.Contract(stableTokenAddress, erc20abi, signer)
  await erc20.dep
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [stableTokenAddress],
  })
  await erc20.tr
}

main()
