const {expect} = require('chai')
const {ethers} = require('hardhat')

describe('Greeter', function () {
  it('Should return the new greeting once it\'s changed', async function () {
    const DefiRound = await ethers.getContractFactory('DefiRound')
    const defiRound = await DefiRound.deploy('Hello, world!')
    await defiRound.deployed()
  })
})

