import express from 'express'
import dotenv from 'dotenv'
import sequelize from './providers/db.js'
import usersRouter from './routes/users/index.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use('/users', usersRouter)

app.listen(+process.env.PORT, '0.0.0.0', () => {
  sequelize // to not delete after compilation
  console.log(`Listening on port ${process.env.PORT}`)
})

