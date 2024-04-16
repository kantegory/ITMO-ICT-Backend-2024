import express from 'express'
import sequelize from './providers/db.js'
import dotenv from 'dotenv'
import usersRouter from './routes/users/index.js'
import { UsersService } from './services/users/index.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use('/users', usersRouter)

app.listen(process.env.PORT, () => {
  sequelize // to not delete after compilation
  console.log(`Listening on port ${process.env.PORT}`)
})

