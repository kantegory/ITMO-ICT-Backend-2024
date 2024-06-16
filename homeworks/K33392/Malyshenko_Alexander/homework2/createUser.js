const db = require('./models')

async function main() {
    await db.User.create({
        firstName: 'alex',
        lastName: 'Test',
        email: 'example@example.com'
    })
}

main()