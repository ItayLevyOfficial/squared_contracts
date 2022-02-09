const { ethers } = require('hardhat')

const main = async () => {
  const DefiRound = await ethers.getContractFactory('DefiRound')
  const treasuryWallet = ethers.Wallet.createRandom()
  const treasury = treasuryWallet.address
  const nativeTokenWrapper = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  const stableToken = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  const ethPrice = 2599_46882140
  const maxTotalValue = ethPrice * 10

  const defiRound = await DefiRound.deploy(nativeTokenWrapper, treasury, maxTotalValue)
  const contractAddress = (await defiRound.deployed()).address
  console.table({ contractAddress })
  const tx = await defiRound.
}

main()
