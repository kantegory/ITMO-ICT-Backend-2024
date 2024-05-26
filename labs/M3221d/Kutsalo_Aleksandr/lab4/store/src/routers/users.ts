import { Router } from "express";
import UserController from "../controllers/user";

const userRouter: Router = Router()

const userController: UserController = new UserController()

userRouter.route('/id/:id')
    .get(userController.get)

userRouter.route('/create/')
    .post(userController.create)
    
userRouter.route('/login')
    .post(userController.login)

userRouter.route('/logout')
    .post(userController.logout)
export default userRouter