import authRouter from "./auth";
import userRouter from "./user";
import { Router } from "express";

const router = Router();

router.use('/users', userRouter);
router.use('/', authRouter);

export default router;