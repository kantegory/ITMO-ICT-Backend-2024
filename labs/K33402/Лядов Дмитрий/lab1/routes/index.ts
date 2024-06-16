import express from "express";
import userRoutes from "./users/UserRoutes";
import authRoutes from "./auth/AuthRouters";
import { auth } from "../middlewares/auth";

const router: express.Router = express.Router();

router.use("/users", auth, userRoutes);
router.use("/", authRoutes);

export default router;
