import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        res.status(401).json({ error: `Unauthorized: token is '${token}'` })
        return
    }

    try {
        req.user = jwt.verify(token, 'SECRET_KEY') as { id: number, isAdmin: boolean }
        next()
    } catch (error) {
        res.status(401).json({ error: `Invalid token: token is '${token}'` })
    }
}

