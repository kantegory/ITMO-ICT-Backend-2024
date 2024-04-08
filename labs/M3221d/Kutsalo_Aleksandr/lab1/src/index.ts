import * as cors from 'cors'
import express from 'express'
import sequelize from "./instances/db"
import mainRouter from "./routers/router"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const app = express()
const port = 4001

sequelize

app.use(bodyParser.json())
app.use('/', mainRouter)
app.use(cookieParser())

app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', `App is listening on http://localhost:${port}`)
})