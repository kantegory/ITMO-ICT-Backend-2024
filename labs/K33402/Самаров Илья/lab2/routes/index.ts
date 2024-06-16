import express from "express";
import userRoutes from "./users/UserRoutes";
import authRoutes from "./auth/AuthRouters";
import productRoutes from "./products/ProductRoutes";
import ordersRoutes from "./orders/OrderRoutes";
import { auth } from "../middlewares/auth";

const router: express.Router = express.Router();

router.use("/users", auth, userRoutes);
router.use("/products", auth, productRoutes);
router.use("/orders", auth, ordersRoutes);
router.use("/", authRoutes);

export default router;
