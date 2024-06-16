import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../model/user";

module.exports = function(roles: string[]) {
    return function(req: Request, res: Response, next: any) {
        try {
            if (!req.headers.authorization) {
                return res.status(403).json({message: "Unauthorized"});
            }
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Unauthorized"});
            }
            
            const parsed = jwt.verify(token, process.env.secret_key as string);
            const user_role = (parsed as User).role_name;
            if (!roles.includes(user_role)){
                return res.status(403).json({message: "Access Denied"});
            }

            next();
    
        } catch(e) {
            if (e instanceof Error) {
                return res.json(e.message);
            }
        }
    };
}