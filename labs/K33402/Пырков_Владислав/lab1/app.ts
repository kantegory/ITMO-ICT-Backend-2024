import bodyParser from 'body-parser'
import express from 'express'
import sequelize from 'src/database'

const PORT = Number(process.env.PORT || 5000)

const app = express()

app.use(bodyParser.json())

app.listen(PORT, () => {
	sequelize // to not delete after compilation
	console.log(`Server is running on port ${PORT}`)
})
