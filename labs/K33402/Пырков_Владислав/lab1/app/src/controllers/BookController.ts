import { Request, Response } from 'express'

import BookService from '../services/BookService'
import handleError from '../utils/handleError'

class BookController {
	public static async createBook(req: Request, res: Response) {
		const { title, author } = req.body
		try {
			const book = await BookService.createBook(title, author)
			return res.status(201).json(book)
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при создании книги',
			})
		}
	}

	public static async getAllBooks(req: Request, res: Response) {
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
