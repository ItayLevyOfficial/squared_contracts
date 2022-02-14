const { myMetamaskWalletAddress } = require('./constants')
const { Contract } = require('ethers')
const { ethers, network } = require('hardhat')
const { selectedChain } = require('../test/chains')

const main = async () => {
  const erc20abi = require('./erc20abi.json')
  await network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [myMetamaskWalletAddress],
  })
  const signer = await ethers.getSigner(myMetamaskWalletAddress)
  const stableCoinContract = new Contract(
    selectedChain.stableToken.address,
    erc20abi,
    signer,
  )
  const myBalance = await stableCoinContract.balanceOf(myMetamaskWalletAddress)
  console.table({ myBalance })
}

main()
