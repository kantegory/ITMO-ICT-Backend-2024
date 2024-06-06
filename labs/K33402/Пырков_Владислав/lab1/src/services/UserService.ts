import sequelize from 'src/database'

import User from '../database/models/User'

const userRepository = sequelize.getRepository(User)

export default class UserService {
	static async getAllUsers() {
		return userRepository.findAll()
	}

	static async getUserById(id: number) {
		return userRepository.findByPk(id)
	}

	static async createUser(userData: any) {
		return userRepository.create(userData)
	}

	static async updateUser(id: number, userData: any) {
		const user = await userRepository.findByPk(id)

		if (!user) {
			throw new Error('User not found')
		}

		await user.update(userData)

		return user
	}

	static async deleteUser(id: number) {
		const user = await User.findByPk(id)

		if (!user) {
			throw new Error('User not found')
		}

		await user.destroy()
	}
}
