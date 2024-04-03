import userRouter from "./routers/users"
import * as cors from 'cors'
import express from 'express'
import sequelize from "./instances/db"

const app = express()
const port = 4001

sequelize

app.use('/users', userRouter)


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})