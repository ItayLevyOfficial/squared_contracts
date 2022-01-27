const {expect} = require('chai')
const {ethers} = require('hardhat')

let defiRound;

describe('Greeter', function () {
  beforeEach(async () => {
    const DefiRound = await ethers.getContractFactory('DefiRound')
    const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    const treasuryWallet = ethers.Wallet.createRandom()
    const treasury = treasuryWallet.address
    defiRound = await DefiRound.deploy(WETH, treasury, 1000)
    await defiRound.deployed()
  })
  it('Should deposit funds successfully', async () => {
    const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    await defiRound.deposit({token: WETH, amount: 200}, [])
  })
  // it('example test from docs', async function () {
    // await defiRound.deposit()
    // expect(await greeter.greet()).to.equal('Hello, world!')
    //
    // const setGreetingTx = await greeter.setGreeting('Hola, mundo!')
    //
    // // wait until the transaction is mined
    // await setGreetingTx.wait()
    //
    // expect(await greeter.greet()).to.equal('Hola, mundo!')
  // })
})

