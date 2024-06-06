import { Request, Response } from 'express'
import UserService from 'src/services/UserService'

export default {
	async getAllUsers(req: Request, res: Response) {
		try {
			const users = await UserService.getAllUsers()
			res.json(users)
		} catch (error) {
			res.status(500).json(error)
		}
	},

	async getUserById(req: Request, res: Response) {
		try {
			const id = Number(req.params.id)
			const user = await UserService.getUserById(id)
			res.json(user)
		} catch (error) {
			res.status(500).json(error)
		}
	},

	async createUser(req: Request, res: Response) {
		try {
			const newUser = await UserService.createUser(req.body)
			res.status(201).json(newUser)
		} catch (error) {
			res.status(500).json(error)
		}
	},

	async updateUser(req: Request, res: Response) {
		try {
			const id = Number(req.params.id)
			const updatedUser = await UserService.updateUser(id, req.body)
			res.json(updatedUser)
		} catch (error) {
			res.status(500).json(error)
		}
	},

	async deleteUser(req: Request, res: Response) {
		try {
			const id = Number(req.params.id)
			await UserService.deleteUser(id)
			res.sendStatus(204)
		} catch (error) {
			res.status(500).json(error)
		}
	},
}
