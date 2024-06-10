import express from 'express'

import sequelize from './src/database'
import router from './src/routes'

const PORT = Number(process.env.PORT) || 5000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)

app.listen(PORT, () => {
	sequelize // to not delete after compilation
	console.log(`Server is running on port ${PORT}`)
})
