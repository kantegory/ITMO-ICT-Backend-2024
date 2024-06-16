import express from 'express'
import sequelize from './providers/db.js'
import dotenv from 'dotenv'
import productsRouter from './routes/products/index.js'
import salesRouter from './routes/sales/index.js'
import customersRouter from './routes/customers/index.js'
import { authMiddlware } from './middleware/auth.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(authMiddlware)
app.use('/products', productsRouter)
app.use('/sales', salesRouter)
app.use('/customers', customersRouter)

app.listen(process.env.PORT, () => {
  sequelize // to not delete after compilation
  console.log(`Listening on port ${process.env.PORT}`)
})

