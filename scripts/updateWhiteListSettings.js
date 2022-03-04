const { configureWhiteList } = require('../test/utils')
const { ethers } = require('hardhat')
const { selectedChain } = require('../test/chains')

const main = async () => {
  const whitelistUsers = [
    '0xE6dD43Bb8ebd36e02AbD716c82168E4802CA6D15',
    '0x3d347295ec18A15F2078F78d210eB946a9DA5790',
    '0x6ab2cf801ccbB570a3c9b7A5879e7f2C1155cBb4',
    '0x83f2A84D1A0EA49B3b9990608957Fd21683D862D',
    '0x454482840247b7D71491c21a0417d1DeE643b0C8',
    '0x001C916731c1212aE731dE11196DFA9406CC6D85',
    '0x2a55F24601AaFE2F7F751BD80f3ca6488df5F30A',
    '0xc5017CA11c8124ff013B3Eb6e8Ea206eFBB7C097',
    '0x909974E1fB15543A7f539aF1981ae500720727A1',
    '0x02d1E6F6C7EADCf752f4174b39ee2AC2d8FbF6eb',
  ]
  const MyContract = await ethers.getContractFactory('DefiRound')
  const defiRound = await MyContract.attach(selectedChain.launchContractAddress)
  await configureWhiteList(whitelistUsers, defiRound)
 } 

main()
