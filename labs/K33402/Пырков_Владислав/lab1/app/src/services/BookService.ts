import sequelize from '../database/index'
import Book from '../database/models/Book'
import serviceHandleError from '../utils/serviceHandleError'

const bookRepository = sequelize.getRepository(Book)

class BookService {
	public static async getBookById(id: number) {
		try {
			const book = await bookRepository.findByPk(id)
			return book
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Ошибка при получении книги по id',
			})
		}
	}

	public static async getAllBooks() {
		try {
			const books = await bookRepository.findAll()
			return books
		} catch (error) {
			return serviceHandleError({ error, message: 'Ошибка при получении книг' })
		}
	}

	public static async createBook(title: string, author: string) {
		try {
			const book = await bookRepository.create({ title, author })
			console.log('Создана книга:', book.toJSON())
			return book
		} catch (error) {
			return serviceHandleError({ error, message: 'Ошибка при создании книги' })
		}
	}

	public static async addBook(title: string, author: string) {
		try {
			const book = await bookRepository.create({ title, author })
			return book
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Ошибка при добавлении книги',
			})
		}
	}

	public static async deleteBook(id: number) {
		try {
			const book = await bookRepository.findByPk(id)
			if (!book) return { message: 'Такой книги не существует' }
			return await book.destroy()
		} catch (error) {
			return serviceHandleError({ error, message: 'Ошибка при удалении книги' })
		}
	}
}

export default BookService
