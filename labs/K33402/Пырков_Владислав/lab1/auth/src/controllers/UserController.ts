import { Request, Response } from 'express'

import ProfileService from '../services/ProfileService'
import UserService from '../services/UserService'
import handleError from '../utils/handleError'

class UserController {
	public static async createUser(req: Request, res: Response) {
		const { name, email, password } = req.body
		try {
			const user = await UserService.createUser(name, email, password)

			await ProfileService.createOrUpdateProfile(user.id, '', '')
			return res.status(201).json(user)
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при создании пользователя',
			})
		}
	}

	public static async getUserById(req: Request, res: Response) {
		const userId = Number(req.params.id)
		try {
			const user = await UserService.getUserById(userId)
			if (!user) {
				return handleError({ res, code: 404, text: 'Пользователь не найден' })
			}
			return res.json(user)
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при получении пользователя',
			})
		}
	}

	public static async deleteUser(req: Request, res: Response) {
		const userId = Number(req.params.id)
		try {
			const success = await UserService.deleteUser(userId)
			if (!success) {
				return handleError({ res, code: 404, text: 'Пользователь не найден' })
			}
			return res.status(204).send()
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при удалении пользователя',
			})
		}
	}
}

export default UserController
