import express from "express"
import RefreshTokenController from "../../controllers/auth/RefreshToken"

const router: express.Router = express.Router()

const controller: RefreshTokenController = new RefreshTokenController()

router.route('/')
    .get(controller.getAll)

export default router