import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../model/user"
import { TeamRepository } from "../repository/team"

const teamRepository = new TeamRepository();

module.exports = async function (req: Request, res: Response, next: any) {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({message: "Unauthorized"})
        }
        
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Unauthorized"})
        }
        
        const parsed = jwt.verify(token, process.env.secret_key as string);
        const user_id = (parsed as User).id;
        const request_user_id = Number(req.params.id);
        
        if (user_id !== request_user_id) {
            return res.status(403).json({message: "Access Denied"});
        }
        next();

    } catch(e) {
        if (e instanceof Error) {
            return res.json(e.message)
        }
    }
}