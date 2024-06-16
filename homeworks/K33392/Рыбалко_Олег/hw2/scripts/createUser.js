const db = require("../models")

async function main() {
  await db.User.create({
    username: "oleg",
    password: "test",
    firstName: "Oleg",
    lastName: "Rybalko",
    isAdmin: true
  })
}

main()