import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import process from 'process'

import sequelize from '../config/sequelize'
import User from '../models/User'
import serviceHandleError from '../utils/serviceHandleError'

const userRepository = sequelize.getRepository(User)

class AuthService {
	static async reg(name: string, email: string, password: string) {
		try {
			const newUser = await userRepository.create({
				name,
				email,
				password: await bcrypt.hash(password, 10),
			})
			const key = process.env.JWT_SECRET_KEY || 'testkey1'
			const token = jwt.sign({ userId: newUser.id }, key, {
				expiresIn: '1h',
			})

			return { token, user: newUser }
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Ошибка при регистрации пользователя',
			})
		}
	}

	static async login(email: string, password: string) {
		try {
			const user = await userRepository.findOne({ where: { email } })
			if (!user) {
				return serviceHandleError({ message: 'Некорретный адрес почты' })
			}

			const passwordMatch = user.checkPassword(password)
			if (!passwordMatch) {
				return serviceHandleError({ message: 'Некорректный пароль' })
			}

			const key = process.env.JWT_SECRET_KEY || 'testkey1'
			const token = jwt.sign({ userId: user.id }, key, {
				expiresIn: '1h',
			})

			return token
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Ошибка при авторизации пользоватея',
			})
		}
	}
}

export default AuthService
