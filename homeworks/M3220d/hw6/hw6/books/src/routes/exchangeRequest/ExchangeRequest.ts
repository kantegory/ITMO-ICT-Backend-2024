import express from "express"
import ExchangeRequestController from "../../controllers/exchangeRequest/ExchangeRequest"

const router: express.Router = express.Router()

const controller: ExchangeRequestController = new ExchangeRequestController()

router.route('/')
    .post(controller.create)

router.route('/')
    .get(controller.getAll)

router.route('/:id')
    .get(controller.getById)

router.route('/:id')
    .put(controller.update)

router.route('/:id')
    .delete(controller.delete)

// получить список заявок пользователя
router.route('/list/:id')
    .get(controller.getExchangeRequestList)

export default router