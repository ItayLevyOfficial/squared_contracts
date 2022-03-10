const { selectedChain } = require('../test/chains')
const { deployAllContracts } = require('./deployAllContracts')

const main = async () => {
  await deployAllContracts(selectedChain.stableToken.address)
}

main()
