const { BigNumber, Contract } = require('ethers')
const { ethers, network } = require('hardhat')
const { selectedChain } = require('../test/chains')

const toBytes32 = (bn) => {
  return ethers.utils.hexlify(ethers.utils.zeroPad(bn.toHexString(), 32))
}

const setStorageAt = async (address, index, value) => {
  await ethers.provider.send('hardhat_setStorageAt', [address, index, value])
  await ethers.provider.send('evm_mine', []) // Just mines to the next block
}

const main = async () => {
  const myMetamaskWalletAddress = '0x079DD7D40051831875C274D190FED9D8db4c135b'
  await network.provider.send('hardhat_setBalance', [
    myMetamaskWalletAddress,
    ethers.utils.parseEther('10').toHexString(),
  ])
  const stableCoinBalance = ethers.BigNumber.from(100_000).mul(
    BigNumber.from(10).pow(BigNumber.from(selectedChain.stableToken.decimals)),
  )
  const index = ethers.utils.solidityKeccak256(
    ['uint256', 'uint256'],
    [myMetamaskWalletAddress, selectedChain.stableToken.slot],
  )

  await setStorageAt(
    selectedChain.stableToken.address,
    index.toString(),
    toBytes32(stableCoinBalance).toString(),
  )

  const erc20abi = require('./erc20abi.json')
  const stableCoinContract = new Contract(
    selectedChain.stableToken.address,
    erc20abi,
    ethers.provider,
  )
  const userBalance = await stableCoinContract.balanceOf(
    myMetamaskWalletAddress,
  )
  console.table({ userBalance })
}

main()
