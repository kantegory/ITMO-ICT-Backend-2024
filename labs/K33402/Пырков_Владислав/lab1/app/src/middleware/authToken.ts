import dotenv from 'dotenv'

import { Request, Response } from 'express'
import process from 'process'

dotenv.config()

const authenticateToken = async (
	req: Request,
	res: Response,
	next: () => {},
) => {
	const authHeader = req.headers['authorization']
	if (authHeader === undefined || !authHeader.startsWith('Bearer')) {
		res.sendStatus(401)
		return
	}

	const token = authHeader.split(' ')[1]

	const authUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8000'
	const resp = await fetch(`${authUrl}/users/verify`, {
		body: JSON.stringify({ token: token }),
		headers: { 'content-type': 'application/json' },
		method: 'POST',
	})
	if (!resp.ok) {
		res.sendStatus(401)
		return
	}
	next()
}

export default authenticateToken
