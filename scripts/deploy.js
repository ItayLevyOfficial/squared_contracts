const { ethers } = require('hardhat')

const main = async () => {
  const DefiRound = await ethers.getContractFactory('DefiRound')
  const treasuryWallet = ethers.Wallet.createRandom()
  const treasury = treasuryWallet.address
  const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  const ethPrice = 2599_46882140
  const maxTotalValue = ethPrice * 10

  defiRound = await DefiRound.deploy(WETH, treasury, maxTotalValue)
  const contractAddress = (await defiRound.deployed()).address
  console.table({ contractAddress })
}

main()
