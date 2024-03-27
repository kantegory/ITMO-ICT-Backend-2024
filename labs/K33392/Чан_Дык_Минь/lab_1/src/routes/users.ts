import { Router } from "express";
import { auth } from "../middleware/auth";

import {
    registerUser,
    getAllUser,
    getUserById,
    deleteUser,
    updateUser,
    loginUser
} from "../controller/users"

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", auth, getAllUser);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
