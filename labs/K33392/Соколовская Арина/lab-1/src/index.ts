import express from "express"
import 'dotenv/config'
import sequelize from "./db/db"
import router from "./routes/user.route"

const app = express()
app.use(express.json());
app.use('/api', router);

app.listen(process.env.port, () => {
  sequelize 
  console.log(`Running on port ${process.env.port}`)
})