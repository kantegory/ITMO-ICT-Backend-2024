import express from "express"
import UserController from "../../controllers/user/User"
import passport from "../../middleware/passport"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/')
    .post(controller.post)

router.route('/')
    .get(controller.getAll)

router.route('/profile')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

router.route('/profile/:id')
    .get(controller.get)

router.route('/login')
    .post(controller.auth)

router.route('/refresh')
    .post(controller.refreshToken)

// получить список книг пользователя
router.route('/books/:id')
    .get(controller.bookList)

// получить список заявок пользователя
router.route('/exchangeRequests/:id')
    .get(controller.exchangeRequestList)

export default router