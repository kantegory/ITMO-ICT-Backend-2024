import * as cors from 'cors'
import express from 'express'
import sequelize from "./instances/db"
import mainRouter from "./routers/router"
import bodyParser from 'body-parser'

const app = express()
const port = 4001

sequelize

app.use(bodyParser.json())
app.use('/', mainRouter)


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})