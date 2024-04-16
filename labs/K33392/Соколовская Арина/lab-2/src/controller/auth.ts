import { Request, Response } from "express"
import { AuthService } from "../service/auth";
import { User } from "../model/user";

const authService = new AuthService();

exports.register_user = async (req: Request, res: Response) => {
    try {
        const user = await authService.post_user(req.body as User)
        res.send(user.toJSON);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.login_user = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};
