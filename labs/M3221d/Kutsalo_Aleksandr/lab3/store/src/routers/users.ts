import { Router } from "express";
import UserController from "../controllers/user";
import requireAuth from "../middleware/authMiddleware";

const userRouter: Router = Router()

const userController: UserController = new UserController()


userRouter.route('/id/:id')
    .get(userController.get)

userRouter.route('/create/')
    .post(userController.create)
    
userRouter.route('/login')
    .post(userController.login)

userRouter.route('/auth_only')
    .get(requireAuth, userController.privatePage)

userRouter.route('/logout')
    .post(userController.logout)
export default userRouter