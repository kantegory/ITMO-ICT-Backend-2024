import express from "express"
import FavoriteController from "../../../controllers/favorites/FavoriteController"


const router: express.Router = express.Router()

const controller: FavoriteController = new FavoriteController()

router.route('/').get(controller.get)

export default router