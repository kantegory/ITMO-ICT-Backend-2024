import express from "express"
import BookController from "../../controllers/book/Book"
import passport from "../../middleware/passport"

const router: express.Router = express.Router()

const controller: BookController = new BookController()

// создание книги
router.route('/')
    .post(passport.authenticate('jwt', { session: false }), controller.create)

// получить все
router.route('/')
    .get(controller.getAll)

// получить по id
router.route('/:id')
    .get(passport.authenticate('jwt', { session: false }), controller.getById)

// обновить
router.route('/:id')
    .put(passport.authenticate('jwt', { session: false }), controller.update)

// удалить
router.route('/:id')
    .delete(passport.authenticate('jwt', { session: false }), controller.delete)

export default router