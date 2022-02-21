const { ethers } = require('hardhat')
const { selectedChain } = require('../test/chains')

const main = async () => {
  const MyContract = await ethers.getContractFactory('DefiRound')
  const launchContractAddress = '0x8A93d247134d91e0de6f96547cB0204e5BE8e5D8'
  const contract = await MyContract.attach(launchContractAddress)
  const rates = [
    {
      token: selectedChain.stableToken.address,
      numerator: 2,
      denominator: 4,
    },
    {
      token: selectedChain.nativeToken.address,
      numerator: 2,
      denominator: 4,
    },
  ]
  await contract.publishRates(
    rates,
    { overNumerator: 4, overDenominator: 2 },
    1_000,
  )
}

main()
