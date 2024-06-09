import { Request, Response, response } from "express"
import axios from "axios"

module.exports = function(roles: string[]) {
    return async function(req: Request, res: Response, next: any) {
        try {
            if (!req.headers.authorization) {
                return res.status(403).json({message: "Unauthorized"});
            }
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({message: "Unauthorized"});
            }

            let user_role = "";
            await axios({
                method: 'get',
                url: 'http://gateway:8000/auth/users/role',
                headers: {}, 
                data: {
                  token: token,
                }
              }).then((res) => {
                user_role = res.data;
            });

            console.log("role: " + user_role);
            // if (!roles.includes(user_role)){
            //     return res.status(403).json({message: "Access Denied"});
            // }

            next();
    
        } catch(e) {
            if (e instanceof Error) {
                return res.json(e.message);
            }
        }
    };
}