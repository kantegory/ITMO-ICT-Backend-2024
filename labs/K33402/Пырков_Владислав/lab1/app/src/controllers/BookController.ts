import { Request, Response } from 'express'
import handleError from 'src/utils/handleError'

import BookService from '../services/BookService'

class BookController {
	public static async create(req: Request, res: Response) {
		const { title, author } = req.body
		try {
			await BookService.createBook(title, author)
			return res.status(201).send('Книга создана успешно')
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при создании книги',
			})
		}
	}

	public static async getAll(req: Request, res: Response) {
		try {
			const books = await BookService.getAllBooks()
			return res.json(books)
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при получении книг',
			})
		}
	}
}

export default BookController
