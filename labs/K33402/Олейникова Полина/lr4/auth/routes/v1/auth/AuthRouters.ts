import express from "express"
import AuthController from "../../../controllers/auth/AuthController"
import { auth } from "../../../middlewares/auth"


const router: express.Router = express.Router()

const controller: AuthController = new AuthController()

router.post('/login', controller.login);
router.post('/register', controller.register);

router.get('/check-token', auth, function (req: any, res: any) {
    res.setHeader('User-Id', req.user.id)
    res.setHeader('User-Role', req.user.role)
    res.sendStatus(200)
})

export default router