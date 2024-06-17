import express from 'express'

import sequelize from './src/config/sequelize'
import router from './src/routes/index'

const PORT = Number(process.env.PORT) || 8000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)

app.listen(PORT, () => {
	sequelize
	console.log(`Authorization service is running on port ${PORT}`)
})
