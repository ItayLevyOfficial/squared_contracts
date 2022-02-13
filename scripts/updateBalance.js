const { ethers, network } = require('hardhat')

const main = async () => {
  const myMetamaskWalletAddress = '0xA3318B6027DC8fC382F990Bee9d2308E2ea3a388'
  await network.provider.send("hardhat_setBalance", [
    myMetamaskWalletAddress,
    ethers.utils.parseEther('10').toHexString()
  ])
}

main()
