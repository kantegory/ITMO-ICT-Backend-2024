import { Request, Response } from 'express'

export const authMiddlware = async (req: Request, res: Response, next: any) => {
    try {
        if (req.path === '/users/auth' || (req.path === '/users/' && req.method == 'POST') || req.path === '/users/verify') {
            next(); return
        }
        
        if (!req.headers.authorization)
            return res.sendStatus(401)
        
        const token = req.headers.authorization.split(' ')[1]
        
        if (!token)
            return res.sendStatus(403)
        
        console.log(`${req.protocol}://${req.hostname}:${process.env.PORT}/users/verify`)
        const resp = await fetch(`${req.protocol}://${req.hostname}:${process.env.PORT}/users/verify`, {
            method: 'POST',
            body: JSON.stringify({ token: token }),
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(await resp.text())

        if (!resp.ok) return res.sendStatus(401)
        next()
    } catch (e) {
        console.log(e)
        res.sendStatus(401)
    }
}