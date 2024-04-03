import express from 'express'
import catsRouter from './routes/cats/index.js'
import sequelize from './providers/db.js'

const app = express()
app.use('/cats', catsRouter)

app.listen(9090, () => {
  console.log('Listeing on port 9090')
})

