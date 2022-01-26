const {expect} = require('chai')
const {ethers} = require('hardhat')

describe('Greeter', function () {
  it('Should return the new greeting once it\'s changed', async function () {
    const DefiRound = await ethers.getContractFactory('DefiRound')
    const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    const defiRound = await DefiRound.deploy(WETH)
    await defiRound.deployed()

    // expect(await greeter.greet()).to.equal('Hello, world!')
    //
    // const setGreetingTx = await greeter.setGreeting('Hola, mundo!')
    //
    // // wait until the transaction is mined
    // await setGreetingTx.wait()
    //
    // expect(await greeter.greet()).to.equal('Hola, mundo!')
  })
})

