import adminRouter from "./admin";
import gradingRouter from "./grading";
import hackathonRouter from "./hackathon";
import homeRouter from "./home";
import solutionRouter from "./solution";
import teamRouter from "./team";
import userRouter from "./user";
import { Router } from "express";

const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.use('/', homeRouter);
router.use('/admin', adminRouter);
router.use('/gradings', gradingRouter);
router.use('/hackathons', hackathonRouter);
router.use('/solutions', solutionRouter);
router.use('/teams', teamRouter);

export default router;