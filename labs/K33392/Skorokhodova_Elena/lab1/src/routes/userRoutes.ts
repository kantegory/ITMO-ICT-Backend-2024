import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();

router.post('/users', UserController.createUser);
router.get('/:id', UserController.getUserById);
router.delete('/:id', UserController.deleteUser);

export { router as userRoutes };
