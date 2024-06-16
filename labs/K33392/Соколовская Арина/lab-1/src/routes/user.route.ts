import express from "express"
import UserController from "../controllers/user.controller"

const router: express.Router = express.Router()

const userController = new UserController()

router
  .route('/user/:id')
  .get(userController.get)
router
  .route('/user')
  .post(userController.post)
  
export default router