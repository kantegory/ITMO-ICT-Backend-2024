import sequelize from '../database'
import User from '../database/models/User'
import serviceHandleError from '../utils/serviceHandleError'

const userRepository = sequelize.getRepository(User)

class UserService {
	static async getUserById(id: number) {
		return userRepository.findByPk(id)
	}

	static async getAllUsers() {
		return userRepository.findAll()
	}

	static async createUser(userData: any) {
		console.log(userData)
		// todo any replace
		return userRepository.create(userData)
	}

	static async updateUser(id: number, userData: any) {
		const user = await userRepository.findByPk(id)

		if (!user) {
			return serviceHandleError({ message: 'Пользователь не найден' })
		}

		await user.update(userData)

		return user
	}

	static async deleteUser(id: number) {
		const user = await User.findByPk(id)

		if (!user) {
			return serviceHandleError({ message: 'Пользователь не найден' })
		}

		await user.destroy()
	}
}

export default UserService
