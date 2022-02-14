const { Contract } = require('ethers')
const { ethers, network } = require('hardhat')
const { selectedChain } = require('../test/chains')

const main = async () => {
  const myMetamaskWalletAddress = '0x079DD7D40051831875C274D190FED9D8db4c135b'
  await network.provider.send('hardhat_setBalance', [
    myMetamaskWalletAddress,
    ethers.utils.parseEther('10').toHexString(),
  ])

  const erc20abi = require('./erc20abi.json')
  const signer = await ethers.getSigner(myMetamaskWalletAddress)
  const stableCoinContract = new Contract(
    selectedChain.stableToken.address,
    erc20abi,
    signer,
  )
  await stableCoinContract.gimmeSome()
}

main()
