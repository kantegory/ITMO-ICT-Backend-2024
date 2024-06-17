import sequelize from '../config/sequelize'
import User from '../models/User'
import serviceHandleError from '../utils/serviceHandleError'

const userRepository = sequelize.getRepository(User)

class UserService {
	public static async createUser(
		name: string,
		email: string,
		password: string,
	) {
		try {
			return userRepository.create({ name, email, password })
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Не удалось создать пользователя',
			})
		}
	}

	public static async getUserById(id: number) {
		try {
			return userRepository.findByPk(id)
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Не удалось найти пользователя',
			})
		}
	}

	public static async deleteUser(id: number) {
		try {
			const user = await userRepository.findByPk(id)
			if (!user) return { message: 'Такого пользователя не существует' }
			return await user.destroy()
		} catch (error) {
			return serviceHandleError({ error, message: 'Такого пользователя нет' })
		}
	}
}

export default UserService
