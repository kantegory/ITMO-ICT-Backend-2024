import authRouter from "./auth";
import userRouter from "./user";
import { Router } from "express";

const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.use('/', userRouter);
router.use('/auth', authRouter);

export default router;