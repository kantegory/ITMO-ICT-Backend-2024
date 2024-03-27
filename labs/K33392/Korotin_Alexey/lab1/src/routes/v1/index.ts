import express from "express";
import userRouter from "./users/User"

const router = express.Router();

router.use("/users", userRouter);

export default router;