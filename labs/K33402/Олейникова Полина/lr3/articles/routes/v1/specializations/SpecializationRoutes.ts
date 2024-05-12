import express from "express"
import SpecializationController from "../../../controllers/specializations/SpecializationController"


const router: express.Router = express.Router()

const controller: SpecializationController = new SpecializationController()

router.route('/')
    .get(controller.get)
    .post(controller.create)

router.route('/:id')
    .patch(controller.update)
    .delete(controller.delete)


export default router