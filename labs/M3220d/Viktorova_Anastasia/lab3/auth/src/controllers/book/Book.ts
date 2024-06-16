import axios from 'axios'

import BookServiceError from '../../errors/bookService/BookServise'

import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../configs/.env') })

class BookController {

    getAll = async (request: any, response: any) => {
        try {
            const url = `http://localhost:${process.env.BOOK_SERVICE_PORT}/bookService/books/`
            
            const { data, status } = await axios.get(url);
            console.log(data)
            if (! [200, 201].includes(status)) {
                throw new BookServiceError(data)
            }
            response.send(data, status)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getById = async (request: any, response: any) => {
        const id = request.params.id
        try {
            const url = `http://localhost:${process.env.BOOK_SERVICE_PORT}/bookService/books/${id}`

            const { data, status } = await axios.get(url);
            console.log("data:", data, "\nstatus: ", status)
            if (! [200, 201].includes(status)) {
                throw new BookServiceError(data)
            }
            response.send(data)
        } catch (error: any) {
            console.log("controller auth: ", error.message)
            response.status(404).send({ "error": error.message })
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request

        try {
            const url = `http://localhost:${process.env.BOOK_SERVICE_PORT}/bookService/books/`
            
            const { data, status } = await axios.post(url, body);
            console.log(data, status)
            if (! [200, 201].includes(status)) {
                throw new BookServiceError(data)
            }
            response.send(data)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request
        const id = request.params.id

        try {
            const url = `http://localhost:${process.env.BOOK_SERVICE_PORT}/bookService/books/${id}`
            
            const { data, status } = await axios.put(url, body);
            console.log(data, status)
            if (! [200, 201].includes(status)) {
                throw new BookServiceError(data)
            }
            response.send(data)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        const id = request.params.id

        try {
            const url = `http://localhost:${process.env.BOOK_SERVICE_PORT}/bookService/books/${id}`
            
            const { data, status } = await axios.delete(url);
            console.log(data, status)
            if (! [200, 201].includes(status)) {
                throw new BookServiceError(data)
            }
            response.send(data)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
}

export default BookController