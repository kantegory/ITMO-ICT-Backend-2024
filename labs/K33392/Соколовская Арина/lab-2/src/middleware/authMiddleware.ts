import { Request, Response } from "express"
import jwt from "jsonwebtoken"

module.exports = function (req: Request, res: Response, next: any) {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({message: "Unauthorized"})
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Unauthorized"})
        }
        
        const parsed = jwt.verify(token, process.env.secret_key as string);
        (req as any).user = parsed;
        next()

    } catch(e) {
        if (e instanceof Error) {
            return res.json(e.message)
        }
    }
}