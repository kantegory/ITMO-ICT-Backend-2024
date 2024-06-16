import { Router } from "express";
import { UserController } from "../../controllers/users/User.js";

const router = Router()
const controller = new UserController()

router.get('/user', controller.get)
router.post('/user', controller.post)

export default router