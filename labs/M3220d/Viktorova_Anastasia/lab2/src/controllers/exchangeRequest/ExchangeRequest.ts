import ExchangeRequest from '../../models/exchangeRequest/ExchangeRequest'
import ExchangeRequestService from '../../services/exchangeRequest/ExchangeRequest'
import ExchangeRequestError from '../../errors/exchangeRequest/ExchangeRequest'

import User from '../../models/user/User'
import UserService from '../../services/user/User'
import UserError from '../../errors/user/User'

import Book from '../../models/book/Book'
import BookService from '../../services/book/Book'
import BookError from '../../errors/book/Book'

class ExchangeRequestController {
    private exchangeRequestService: ExchangeRequestService
    private userService: UserService
    private bookService: BookService

    constructor() {
        this.exchangeRequestService = new ExchangeRequestService()
        this.userService = new UserService()
        this.bookService = new BookService()
    }

    getAll = async (request: any, response: any) => {
        try {
            const exchangeRequests: ExchangeRequest[] | ExchangeRequestError = await this.exchangeRequestService.getAll()

            response.send(exchangeRequests)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const exchangeRequest: ExchangeRequest | ExchangeRequestError = await this.exchangeRequestService.getById(
                Number(request.params.id)
            )

            response.send(exchangeRequest)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request
        const { applicantId, bookId } = body

        try {
            const applicant = await this.userService.getById(applicantId)
            const book = await this.bookService.getById(bookId)

            if(!(applicant && book)) {
                throw new Error("Applicant or book doesn't exist")
            }

            const { ownerId } = book

            if (ownerId == applicantId) {
                throw new Error("Book owner and applicant are the same")
            }

            const exchangeRequest : ExchangeRequest | ExchangeRequestError = await this.exchangeRequestService.create(body)
            response.status(201).send(exchangeRequest)
            
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request
        const id = request.params.id
        const { applicantId, bookId } = body

        console.log("bookId:", bookId, "Appl:", applicantId)

        try {
            if(applicantId) {
                const applicant = await this.userService.getById(applicantId)
                if(!applicant) {
                    throw new Error("Applicant doesn't exist")
                }
            }
            if(bookId) {
                const book = await this.bookService.getById(bookId)
                if(!book) {
                    throw new Error("Book doesn't exist")
                } 

                const { ownerId } = book

                if (ownerId == applicantId) {
                    throw new Error("Book owner and applicant are the same")
                }
            }
            
            const exchangeRequest : ExchangeRequest | ExchangeRequestError = await this.exchangeRequestService.update(id, body)
            response.status(201).send(exchangeRequest)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        const id = request.params.id

        try {
            const exchangeRequest : void | ExchangeRequestError = await this.exchangeRequestService.delete(id)

            response.status(201).send(exchangeRequest)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
}

export default ExchangeRequestController