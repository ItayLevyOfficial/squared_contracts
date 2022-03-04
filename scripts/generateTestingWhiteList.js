const { ethers } = require('hardhat')
const { hashAddress } = require('../test/utils')

const main = async () => {
  const myWalletAddresses = [
    '0x909974E1fB15543A7f539aF1981ae500720727A1',
    '0x02d1E6F6C7EADCf752f4174b39ee2AC2d8FbF6eb',
  ]
  const randomWalletAddresses = Array.apply(null, Array(8)).map(
    () => ethers.Wallet.createRandom().address,
  )
  const whiteListedAddresses = [...randomWalletAddresses, ...myWalletAddresses]
  console.log({ whiteListedAddresses })
  const hashedAddresses = whiteListedAddresses.map(hashAddress)
  console.log({ hashedAddresses: JSON.stringify(hashedAddresses) })
}

main()
