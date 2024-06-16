import express from "express"
import BookController from "../../controllers/book/Book"

const router: express.Router = express.Router()

const controller: BookController = new BookController()

// создание книги
router.route('/')
    .post(controller.create)

// получить все
router.route('/')
    .get(controller.getAll)

// получить по id
router.route('/:id')
    .get(controller.getById)

// обновить
router.route('/:id')
    .put(controller.update)

// удалить
router.route('/:id')
    .delete(controller.delete)

// получить список книг пользователя
router.route('/list/:id')
    .get(controller.getBookList)

export default router