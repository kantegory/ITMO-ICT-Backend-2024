import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import AuthService from '../services/AuthService'
import UserService from '../services/UserService'
import handleError from '../utils/handleError'

class AuthController {
	static async reg(req: Request, res: Response) {
		try {
			const { name, email, password } = req.body
			const { token, user } = await AuthService.reg(name, email, password)
			return res.status(201).json({ token, user })
		} catch (error) {
			return { message: 'Ошибка при регистрации пользователя' }
		}
	}

	static async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body
			const token = await AuthService.login(email, password)
			return res.status(200).json({ token })
		} catch (error) {
			return handleError({ res, error })
		}
	}

	static async verify(req: Request, res: Response) {
		try {
			const { token } = req.body
			if (!token) {
				return handleError({ res, text: 'Отсутствует токен' })
			}
			const payload = jwt.verify(
				token,
				process.env.JWT_SECRET_KEY || 'testkey1',
			)
			const userId = (payload as JwtPayload).userId
			if (!userId) {
				return handleError({ res, text: 'Неверный токен' })
			}
			await UserService.getUserById(userId)
			return res.sendStatus(200)
		} catch (error) {
			return handleError({ res, text: 'Неверный токен' })
		}
	}
}

export default AuthController
