import jwt from 'jsonwebtoken'
import process from 'process'

import sequelize from '../config/sequelize'
import User from '../models/User'
import serviceHandleError from '../utils/serviceHandleError'

const userRepository = sequelize.getRepository(User)

class AuthService {
	static async reg(name: string, email: string, password: string) {
		const existingUser = await userRepository.findOne({ where: { email } })
		if (existingUser) {
			return serviceHandleError({ message: 'Эта почта уже используется' })
		}
		try {
			console.log('CREATE USER')
			const newUser = await userRepository.create({
				name,
				email,
				password,
			})
			const key = process.env.JWT_SECRET_KEY || ''
			const token = jwt.sign({ userId: newUser.id }, key, {
				expiresIn: '1h',
			})

			return token
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

			const passwordMatch = await user.checkPassword(password)
			console.log('Результат проверки пароля: ', passwordMatch)
			if (!passwordMatch) {
				return serviceHandleError({ message: 'Некорректный пароль' })
			}

			const key = process.env.JWT_SECRET_KEY || ''
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
