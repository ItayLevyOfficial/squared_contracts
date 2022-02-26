const main = async () => {
  const whitelistedUsers = require('./whitelistedUsers.json').map((buffer) =>
    Buffer.from(buffer.data),
  )
  console.log({ whitelistedUsers })
}

main()
