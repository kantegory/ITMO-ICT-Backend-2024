import { Request, Response } from "express"
import { AuthService } from "../service/auth";
import { User } from "../model/user";
import { UserService } from "../service/user";

const authService = new AuthService();
const userService = new UserService();

exports.register_user = async (req: Request, res: Response) => {
    try {
        const { name, surname, email, password, about } = req.body;
        const user = await userService.findByEmail(email);
        if (user) {
            return res.status(400).json({message: `User with email ${email} already exists`})
        }
        const new_user = await authService.post_user(req.body as User);
        res.send(new_user.toJSON());
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.login_user = async (req: Request, res: Response) => {
    try {
        // const 
        // const user = await authService.post_user(req.body as User)
        // res.send(user.toJSON());
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};
