import express, { Router } from "express"
import 'dotenv/config'
import sequelize from "./config/db";

const app = express()
app.use(express.json());

const router = Router();

// router.use('/', homeRouter);
// router.use('/users', usersRouter);

export default router;

app.listen(process.env.port, () => {
  sequelize 
  console.log(`Running on port ${process.env.port}`)
})