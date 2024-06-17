import dotenv from 'dotenv'

import { Request, Response } from 'express'
import process from 'process'

dotenv.config()

const authenticateToken = async (req: Request, res: Response, next: any) => {
	try {
		if (req.path.includes('auth')) {
			next()
		}
		if (!req.headers.authorization) {
			return res.sendStatus(401)
		}
		const token = req.headers.authorization.split(' ')[0]
		if (!token) {
			return res.sendStatus(403)
		}
		console.log(
			`${req.protocol}://${req.hostname}:${process.env.AUTH_PORT}/auth/verify`,
		)
		const resp = await fetch(
			`${req.protocol}://${req.hostname}:${process.env.AUTH_PORT}/auth/verify`,
			{
				method: 'POST',
				body: JSON.stringify({ token }),
				headers: { 'Content-Type': 'application/json' },
			},
		)
		console.log(await resp.text())

		if (!resp.ok) {
			return res.sendStatus(401)
		}
		next()
		return
	} catch (error) {
		console.error(error)
		return res.sendStatus(401)
	}
}

export default authenticateToken
