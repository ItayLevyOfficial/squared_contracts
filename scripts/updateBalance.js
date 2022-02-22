const { Contract } = require('ethers')
const { ethers, network } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { myMetamaskWalletAddress } = require('./constants')

const main = async () => {
  await network.provider.send('hardhat_setBalance', [
    myMetamaskWalletAddress,
    ethers.utils.parseEther('10').toHexString(),
  ])

  const erc20abi = require('./erc20abi.json')
  await network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [myMetamaskWalletAddress],
  })

  const signer = await ethers.getSigner(myMetamaskWalletAddress)
  const stableCoinContract = new Contract(
    selectedChain.stableToken.address,
    erc20abi,
    signer
  )
  const sqrdCoinContract = new Contract(
    selectedChain.sqrdToken.address,
    erc20abi,
    signer
  )
  const sqrdLpCoinContract = new Contract(
    selectedChain.sqrdLpToken.address,
    erc20abi,
    signer
  )
  await stableCoinContract.gimmeSome()
  await sqrdCoinContract.gimmeSome()
  await sqrdLpCoinContract.gimmeSome()
  await network.provider.request({
    method: 'hardhat_stopImpersonatingAccount',
    params: [myMetamaskWalletAddress],
  })
}

main()
