import express from "express"
import ExchangeRequestController from "../../controllers/exchangeRequest/ExchangeRequest"
import passport from "../../middleware/passport"

const router: express.Router = express.Router()

const controller: ExchangeRequestController = new ExchangeRequestController()

router.route('/')
    .post(passport.authenticate('jwt', { session: false }), controller.create)

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), controller.getAll)

router.route('/:id')
    .get(passport.authenticate('jwt', { session: false }), controller.getById)

router.route('/:id')
    .put(passport.authenticate('jwt', { session: false }), controller.update)

router.route('/:id')
    .delete(passport.authenticate('jwt', { session: false }), controller.delete)

export default router