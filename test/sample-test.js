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

  it('Should add ETH to the supported tokens list', async () => {
    const ethereumChainlinkAddress = '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'
    const wrappedEthereumTokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    // await defiRound.
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

