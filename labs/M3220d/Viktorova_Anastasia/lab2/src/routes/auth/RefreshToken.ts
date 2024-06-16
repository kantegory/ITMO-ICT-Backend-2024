import express from "express"
import RefreshTokenController from "../../controllers/auth/RefreshToken"
import passport from "../../middleware/passport"

const router: express.Router = express.Router()

const controller: RefreshTokenController = new RefreshTokenController()

router.route('/')
    .get(controller.getAll)

export default router