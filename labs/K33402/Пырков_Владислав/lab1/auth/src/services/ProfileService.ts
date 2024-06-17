import sequelize from '../config/sequelize'
import Profile from '../models/Profile'
import User from '../models/User'
import serviceHandleError from '../utils/serviceHandleError'

const userRepository = sequelize.getRepository(User)
const profileRepository = sequelize.getRepository(Profile)

class ProfileService {
	public static async createOrUpdateProfile(
		userId: number,
		location: string,
		bio: string,
	) {
		console.log('STARTED ENDPOINT')
		console.log(userId, location, bio)
		try {
			console.log('СОздание профиля')
			const profile = await profileRepository.create({ userId, location, bio })

			console.log('profile created')
			const user = await userRepository.findByPk(Number(userId))
			if (!user) {
				return serviceHandleError({ message: 'Пользователь не найден' })
			}

			console.log('user found')

			return {
				profile: {
					id: profile.id,
					userId: profile.userId,
					location: profile.location,
					bio: profile.bio,
				},
				userName: user.name,
				userEmail: user.email,
			}
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Ошибка при создании / обновлении профиля',
			})
		}
	}

	public static async getProfileByUserId(userId: number) {
		const user = await userRepository.findByPk(userId)

		if (!user) {
			return { message: 'Такого пользователя нет' }
		}

		const profile = await profileRepository.findOne({ where: { userId } })
		if (!profile) {
			return { message: 'Такого профиля нет' }
		}

		return {
			profile,
			userName: user.name,
			userEmail: user.email,
		}
	}
}

export default ProfileService
