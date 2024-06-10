import { Request, Response } from 'express'
import UserService from 'src/services/UserService'
import handleError from 'src/utils/handleError'

export default {
	async getUserById(req: Request, res: Response) {
		try {
			const id = Number(req.params.id)
			const user = await UserService.getUserById(id)
			return res.status(201).json(user)
		} catch (error) {
			return handleError({ res, error, code: 500 })
		}
	},
	async getAllUsers(req: Request, res: Response) {
		try {
			const users = await UserService.getAllUsers()
			return res.status(201).json(users)
		} catch (error) {
			return res.status(500).json(error)
		}
	},

	async createUser(req: Request, res: Response) {
		try {
			const newUser = await UserService.createUser(req.body)
			res.status(201).json(newUser)
		} catch (error) {
			handleError({ res, error, code: 500 })
		}
	},

	async updateUser(req: Request, res: Response) {
		try {
			const id = Number(req.params.id)
			const updatedUser = await UserService.updateUser(id, req.body)
			return res.status(201).json(updatedUser)
		} catch (error) {
			return handleError({ res, error, code: 500 })
		}
	},

	async deleteUser(req: Request, res: Response) {
		try {
			const id = Number(req.params.id)
			const user = await UserService.deleteUser(id)
			return res.status(204).json(user)
		} catch (error) {
			return handleError({ res, error, code: 500 })
		}
	},
}
