import express from "express";
import 'dotenv/config'
import sequelize from "./config/db";
import router from "./route/index"


const app = express()
app.use(express.json());

app.use('', router);

app.listen(process.env.port, () => {
  sequelize 
  console.log(`Running on port ${process.env.port}`)
})