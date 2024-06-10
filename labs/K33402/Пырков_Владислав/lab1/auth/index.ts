import express from 'express'

const PORT = Number(process.env.PORT) || 8000

const app = express()

app.use(express.json()) // Used to parse JSON bodies

app.listen(PORT, () => {
	console.log(`Authorization service is running on port ${PORT}`)
})
