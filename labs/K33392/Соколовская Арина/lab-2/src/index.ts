import express, { Router } from "express"
import 'dotenv/config'
import sequelize from "./config/db";
import homeRouter from "./route/home";
import adminRouter from "./route/admin";
import authRouter from "./route/auth";
import gradingRouter from "./route/grading";
import hackathonRouter from "./route/hackathon";
import solutionRouter from "./route/solution";
import teamRouter from "./route/team";
import userRouter from "./route/user";

const app = express()
app.use(express.json());

const router = Router();

router.use('/', homeRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/gradings', gradingRouter);
router.use('/hackatons', hackathonRouter);
router.use('/solutions', solutionRouter);
router.use('/teams', teamRouter);

export default router;

app.listen(process.env.port, () => {
  sequelize 
  console.log(`Running on port ${process.env.port}`)
})