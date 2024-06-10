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
		try {
			let profile = await profileRepository.findOne({ where: { userId } })
			if (!profile) {
				profile = await profileRepository.create({ userId, location, bio })
			} else {
				profile.location = location
				profile.bio = bio
				await profile.save()
			}

			const user = await userRepository.findByPk(userId)
			if (!user) {
				return serviceHandleError({ message: 'Пользователь не найден' })
			}

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
			profile: {
				id: profile.id,
				userId: profile.userId,
				location: profile.location,
				bio: profile.bio,
			},

			userName: user.name,
			userEmail: user.email,
		}
	}
}

export default ProfileService
