import express from "express";
import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/AuthController";
import { ProfileController } from "../controllers/ProfileController";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.post("/token/verify", AuthController.verify);

router.post("/users/:userId/profile", ProfileController.createOrUpdateProfile);
router.get("/users/:userId/getprofile", ProfileController.getProfileByUserId);

router.post("/users", UserController.createUser);
router.get("/users/:id", UserController.getUserById);
router.delete("/users/:id", UserController.deleteUser);

export { router as userRoutes };
