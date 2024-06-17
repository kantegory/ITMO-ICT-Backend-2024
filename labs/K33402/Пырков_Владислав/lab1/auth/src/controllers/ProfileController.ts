import { Request, Response } from 'express'

import ProfileService from '../services/ProfileService'
import UserService from '../services/UserService'
import handleError from '../utils/handleError'

class ProfileController {
	public static async createOrUpdateProfile(req: Request, res: Response) {
		const userId = Number(req.body.userId)
		const { location, bio } = req.body

		try {
			const user = await UserService.getUserById(userId)
			if (!user) {
				return handleError({ res, code: 404, text: 'Пользователь не найден' })
			}

			const profileData = await ProfileService.createOrUpdateProfile(
				userId,
				location,
				bio,
			)

			return res.status(201).json(profileData.profile)
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при создании / обновлении пользователя',
			})
		}
	}

	public static async getProfileByUserId(req: Request, res: Response) {
		const userId = Number(req.body.userId)

		try {
			const profileData = await ProfileService.getProfileByUserId(userId)

			if (!profileData) {
				return handleError({ res, code: 404, text: 'Профиль не найден' })
			}
			console.log('ДАННЫЕ ПРОФИЛЯ:', profileData)
			return res.status(200).json(profileData.profile)
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при получении профиля',
			})
		}
	}
}

export default ProfileController
