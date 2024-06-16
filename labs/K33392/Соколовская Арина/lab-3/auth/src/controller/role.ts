import { Role } from "../model/user";
import { Request, Response } from "express"
import { RoleService } from "../service/role";

const roleService = new RoleService();

exports.create_role = async (req: Request, res: Response) => {
    try {
        const role = await roleService.post(req.body as Role);
        if (role != null) res.send(JSON.stringify(role));
    } catch(e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }  
    }
}
