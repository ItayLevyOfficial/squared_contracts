const { ethers } = require('hardhat')
const { selectedChain } = require('../test/chains')
const { supportNativeToken, supportStableToken } = require('../test/utils')
const { deployContract } = require('./utils')

const main = async () => {
  const treasuryAddress = ethers.Wallet.createRandom().address
  // Need extra 8 zeros for the decimals.
  const maxTotalValue = 100_000_00000000
  const deployedContract = await deployContract({
    contractName: 'DefiRound',
    params: [selectedChain.nativeToken.address, treasuryAddress, maxTotalValue],
  })
  await supportNativeToken(deployedContract)
  await supportStableToken({ defiRoundContract: deployedContract })
}

main()
