const express = require('express')
const routers = require('./routers')

const app = express()
const port = 3000

app.use(express.json())
for (let router of routers) {
    app.use(router.prefix, router.router)
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})