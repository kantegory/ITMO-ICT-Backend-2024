import express from "express";
import userRoutes from "./userRoutes";
import itemRoutes from "./itemRoutes";
import brandRoutes from "./brandRoutes";
import cartRoutes from "./cartRoutes";
import reviewRoutes from "./reviewRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/items", itemRoutes);
router.use("/brands", brandRoutes);
router.use("/cart", cartRoutes);
router.use("/reviews", reviewRoutes);

export default router;
