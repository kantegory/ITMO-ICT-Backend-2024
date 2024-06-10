import express from 'express'
import sequelize from 'src/database'

const PORT = Number(process.env.PORT) || 5000

const app = express()

app.use(express.json()) // Used to parse JSON bodies

app.listen(PORT, () => {
	sequelize // to not delete after compilation
	console.log(`Server is running on port ${PORT}`)
})
