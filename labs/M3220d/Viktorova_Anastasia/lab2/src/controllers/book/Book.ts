import User from '../../models/user/User'
import UserService from '../../services/user/User'
import UserError from '../../errors/user/User'

import Book from '../../models/book/Book'
import BookService from '../../services/book/Book'
import BookError from '../../errors/book/Book'

import jwt from 'jsonwebtoken'
import { jwtOptions } from '../../middleware/passport'
import RefreshTokenService from '../../services/auth/RefreshToken'

class BookController {
    private bookService: BookService

    constructor() {
        this.bookService = new BookService()
    }

    getAll = async (request: any, response: any) => {
        try {
            const books: Book[] | BookError = await this.bookService.getAll()

            response.send(books)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const book: Book | BookError = await this.bookService.getById(
                Number(request.params.id)
            )

            response.send(book)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request

        console.log(body)

        try {
            const book : Book | BookError = await this.bookService.create(body)

            response.status(201).send(book)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request
        const id = request.params.id

        try {
            const book : Book | BookError = await this.bookService.update(id, body)

            response.status(201).send(book)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        const id = request.params.id

        try {
            const book : void | BookError = await this.bookService.delete(id)

            response.status(201).send(book)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
}

export default BookController