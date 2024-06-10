import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import UserService from '../services/UserService'
import handleError from '../utils/handleError'

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
			console.log(req.body)
			console.log('TRY CREATE')
			console.log('TRY CREATE')
			console.log('TRY CREATE')
			console.log('TRY CREATE')
			console.log('TRY CREATE')
			console.log('TRY CREATE')
			const newUser = await UserService.createUser(req.body)
			console.log('created')
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

	async verify(req: Request, res: Response) {
		try {
			const { token } = req.body
			if (!token) return res.sendStatus(401)
			const key = process.env.SECRET_KEY || ''
			const payload = jwt.verify(token, key)
			const userId = (payload as JwtPayload).id
			if (!userId) return res.sendStatus(401)
			const user = await UserService.getUserById(userId)
			if (!user) return res.sendStatus(401)
			return res.sendStatus(200)
		} catch (error) {
			return handleError({ res, error })
		}
	},
}
