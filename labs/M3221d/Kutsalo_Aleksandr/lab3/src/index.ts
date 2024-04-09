import express from 'express'
import sequelize from "./instances/db"
import mainRouter from "./routers/router"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { PORT } from './config/config'
import path from 'path'

const app = express()
const port = PORT

sequelize

app.set('view engine', 'pug')
app.set('views', path.join(path.resolve(), 'src/views'));

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', mainRouter)

app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', `App is listening on http://localhost:${port}`)
})