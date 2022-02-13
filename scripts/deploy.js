const { ethers } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { supportNativeToken, supportStableToken } = require('../test/utils')

const main = async () => {
  const DefiRound = await ethers.getContractFactory('DefiRound')
  const treasuryWallet = ethers.Wallet.createRandom()
  const treasury = treasuryWallet.address
  // Need extra 8 zeros for the decimals.
  const maxTotalValue = 100_000_00000000

  const defiRound = await DefiRound.deploy(
    selectedChain.nativeToken.address,
    treasury,
    maxTotalValue,
  )
  const contractAddress = (await defiRound.deployed()).address
  console.table({ contractAddress })
  await supportNativeToken(defiRound)
  await supportStableToken(defiRound)
}

main()
