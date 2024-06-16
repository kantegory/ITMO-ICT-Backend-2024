import express from "express"
import AuthController from "../../../controllers/auth/auth"
import listEndpoints from 'express-list-endpoints';


const router: express.Router = express.Router()

const controller: AuthController = new AuthController()

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/refresh-token', controller.refreshToken);

console.log(listEndpoints(router));

export default router

