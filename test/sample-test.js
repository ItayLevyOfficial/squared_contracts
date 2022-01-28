const {expect} = require('chai')
const {ethers} = require('hardhat')

let defiRound;
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

const addWethToSupportedTokens = async() => {
  const ethereumChainlinkAddress = '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'
  const genesisPoolAddress = '0x5450D2d0CFdF107c0698B52596f3488cF88B0252'

  await defiRound.addSupportedTokens([{
      token: WETH,
      oracle: ethereumChainlinkAddress,
      genesis: genesisPoolAddress,
      maxLimit: 500
  }])
}

describe('Take off contract', function () {
  beforeEach(async () => {
    const DefiRound = await ethers.getContractFactory('DefiRound')
    const treasuryWallet = ethers.Wallet.createRandom()
    const treasury = treasuryWallet.address
    defiRound = await DefiRound.deploy(WETH, treasury, 1000)
    await defiRound.deployed()
  })

  it('Should add ETH to the supported tokens list', async () => {
    await addWethToSupportedTokens()
  })

  it('Should deposit funds successfully', async () => {
    await addWethToSupportedTokens()
    await defiRound.deposit({token: WETH, amount: 50}, [], {value: ethers.utils.parseEther("0.5")})
  })
  // it('example test from docs', async function () {
  //   await defiRound.deposit()
  //   expect(await greeter.greet()).to.equal('Hello, world!')
    
  //   const setGreetingTx = await greeter.setGreeting('Hola, mundo!')
    
  //   // wait until the transaction is mined
  //   await setGreetingTx.wait()
    
  //   expect(await greeter.greet()).to.equal('Hola, mundo!')
  // })
})

