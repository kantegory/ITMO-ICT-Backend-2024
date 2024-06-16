import express from 'express'
import sequelize from './providers/db.js'
import dotenv from 'dotenv'

import userRouter from './routes/User.js'
import customerRouter from './routes/Customer.js'
import saleRouter from './routes/Sale.js'
import productRouter from './routes/Product.js'
import { authMiddlware } from './middleware/auth.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(authMiddlware)
app.use('/users', userRouter)
app.use('/customers', customerRouter)
app.use('/sales', saleRouter)
app.use('/products', productRouter)

app.listen(process.env.PORT, () => {
  sequelize // to not delete after compilation
  console.log(`Listening on port ${process.env.PORT}`)
})
