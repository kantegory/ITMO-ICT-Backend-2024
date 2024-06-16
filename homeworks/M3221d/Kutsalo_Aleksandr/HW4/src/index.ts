import express from 'express'
import sequelize from "./instances/db"
import mainRouter from "./routers/router"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
// import * as swaggerConfig from './swagger.json'
import swaggerUi from 'swagger-ui-express'

const app = express()

sequelize

const port = process.env.PORT

app.set('view engine', 'pug')
app.set('views', path.join(path.resolve(), 'src/views'));

app.use(bodyParser.json())
app.use(cookieParser())


app.use('/api', swaggerUi.serve)
// app.use('/api', swaggerUi.setup(swaggerConfig))
app.use('/', mainRouter)

app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', `App is listening on http://localhost:${port}`)
})