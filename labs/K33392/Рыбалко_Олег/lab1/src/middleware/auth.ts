import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import process from 'process'

export const authMiddlware = async (req: Request, res: Response, next: any) => {
  try {
    if (
      req.path === '/users/auth' ||
      (req.path === '/users' && req.method == 'POST')
    ) {
      next()
      return
    }
    if (!req.headers.authorization) return res.sendStatus(401)
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.sendStatus(403)
    const resp = await fetch(`${process.env.AUTH_URL}/users/verify`, {
      method: 'POST',
      body: JSON.stringify({ token: token }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!resp.ok) return res.sendStatus(401)
    req['user'] = await resp.json()
    next()
  } catch (e) {
    console.log(e)
    res.sendStatus(401)
  }
}

