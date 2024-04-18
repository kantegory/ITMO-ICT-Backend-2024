import express from "express";
import userRoutes from "./routes/users/User.js"
import Sequelize from "./providers/db.js"
import dotenv from 'dotenv'


dotenv.config()
const app = express()
app.use(express.json())
app.use('/', userRoutes)

app.listen(8080, () => {
  Sequelize 
  console.log(`Listening on port 8080`)
})