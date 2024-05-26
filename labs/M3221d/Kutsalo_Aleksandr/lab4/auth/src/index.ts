import express from 'express'
import sequelize from "./instances/db"
import mainRouter from "./routers/router"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const app = express()

sequelize

const port = process.env.PORT

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', mainRouter)

app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', `App is listening on http://localhost:${port}`)
})