const main = async () => {
  const whitelistedUsers = require('./whitelistedUsers.json').map(buffer => buffer.data)
  console.log({ whitelistedUsers })
}

main()
