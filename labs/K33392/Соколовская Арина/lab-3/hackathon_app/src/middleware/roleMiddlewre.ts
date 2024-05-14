import { Request, Response } from "express"
import axios from "axios"

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

            let user_role = "";
            axios.post(`http://localhost:8000/auth/token/${token}`).then((resp) => {
                user_role = resp.data;
            });
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