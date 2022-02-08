let defiRound

const deployLaunchContract = async () => {
  const DefiRound = await ethers.getContractFactory('DefiRound')
  const treasuryWallet = ethers.Wallet.createRandom()
  const treasury = treasuryWallet.address
  defiRound = await DefiRound.deploy(WETH, treasury, maxTotalValue)
  await defiRound.deployed()
}

describe('Get account balance', () => {
  beforeEach(async () => {
    await deployLaunchContract
  })

  it ('Should run', () => {
    console.log('aaaa');
  })
})