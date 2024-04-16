import adminRouter from "./admin";
import authRouter from "./auth";
import gradingRouter from "./grading";
import hackathonRouter from "./hackathon";
import homeRouter from "./home";
import solutionRouter from "./solution";
import teamRouter from "./team";
import userRouter from "./user";
import { Router } from "express";


const router = Router();

router.use('', homeRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/gradings', gradingRouter);
router.use('/hackatons', hackathonRouter);
router.use('/solutions', solutionRouter);
router.use('/teams', teamRouter);

export default router;