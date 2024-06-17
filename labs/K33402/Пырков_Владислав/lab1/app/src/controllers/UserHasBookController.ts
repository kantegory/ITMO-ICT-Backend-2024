import { Request, Response } from 'express'

import UserHasBookService from '../services/UserHasBookService'
import handleError from '../utils/handleError'

export default {
	async getUserBooks(req: Request, res: Response) {
		try {
			const id = Number(req.body.id)
			const books = await UserHasBookService.getUserBooks(id)
			return res.status(201).json(books)
		} catch (error) {
			return handleError({ res, error, code: 500 })
		}
	},

	async addUserBook(req: Request, res: Response) {
		try {
			const { userId, bookId } = req.body
			const newRecord = await UserHasBookService.addUserBook(userId, bookId)
			res.status(201).json(newRecord)
		} catch (error) {
			handleError({ res, error, code: 500 })
		}
	},

	async deleteUserBook(req: Request, res: Response) {
		try {
			const id = Number(req.body.id)
			const userBook = await UserHasBookService.deleteUserBook(id)
			return res.status(204).json(userBook)
		} catch (error) {
			return handleError({ res, error, code: 500 })
		}
	},
}
