import express from "express";
import { UserController } from "../controllers/User";

const router = express.Router();

router.post('/users', UserController.createUser);
router.get('/users/:id', UserController.getUserById);
router.delete('/users/:id', UserController.deleteUser);

export { router as userRoutes };
