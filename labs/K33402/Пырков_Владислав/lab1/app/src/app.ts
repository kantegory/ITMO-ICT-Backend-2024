import express from 'express'

import sequelize from './database/index'
import authenticateToken from './middleware/authToken'
import router from './routes/index'

const PORT = Number(process.env.PORT) || 5000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(authenticateToken)
app.use('/', router)

app.listen(PORT, () => {
	sequelize // to not delete after compilation
	console.log(`Server is running on port ${PORT}`)
})
