import Book from '../../models/book/Book'
import BookError from '../../errors/book/Book'

class BookService {
    async isExist(id: number) : Promise<boolean> {
        const book = await Book.findByPk(id)

        if (book) return true

        return false
    }

    async getById(id: number) : Promise<Book> {
        const book = await Book.findByPk(id)

        console.log("service: ", book)

        if (book) return book.toJSON()

        throw new BookError('Not found!')
    }

    async getAll() : Promise<Book[]|BookError> {
        const books = await Book.findAll()

        if (books) return books

        throw new BookError('Not found!')
    }

    async getByOwner(ownerId: number) : Promise<Book[]|BookError> {
        const books = await Book.findAll({ where: { "ownerId": ownerId } })

        console.log("server", books)

        if (books) return books

        throw new BookError('Not found!')
    }

    async create(bookData: any) : Promise<Book|BookError> {
        try {
            const book = await Book.create(bookData)

            return book.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new BookError(errors)
        }
    }

    async update(id: number, bookData: any) : Promise<Book|BookError> {
        try {
            const book = await Book.findByPk(id)

            if (book) {
                const updateBook = await book.update(bookData)   

                return updateBook.toJSON()
            }

            throw new BookError('Not found!')
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new BookError(errors)
        }
    }

    async delete(id: number) : Promise<void|BookError> {
        try {
            const book = await Book.findByPk(id)

            if (book) {
                const deletedBook = await book.destroy() 

                return deletedBook
            }

            throw new BookError('Not found!')
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new BookError(errors)
        }
    }
}

export default BookService