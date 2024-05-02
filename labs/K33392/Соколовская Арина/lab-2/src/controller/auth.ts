import { Request, Response } from "express"
import { AuthService } from "../service/auth";
import { User } from "../model/user";
import { UserService } from "../service/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config'

const dotenv = require('dotenv');

dotenv.config()

const authService = new AuthService();
const userService = new UserService();

const generateAcessToken = (id: number, role_name: string, email: string) => {
    const payload = { id, role_name, email };
    return jwt.sign(payload, process.env.secret_key as string, { expiresIn: "24h" });

}

exports.register_user = async (req: Request, res: Response) => {
    try {
        const { name, surname, email, password, about } = req.body;
        const user = await userService.findByEmail(email);
        if (user) {
            return res.status(400).json({message: `User with email ${email} already exists`});
        }
        const new_user = await authService.post_user(req.body as User);
        res.send(JSON.stringify(new_user));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.login_user = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findByEmail(email);
        if (!user) {
            return res.status(400).json({message: `No user with email ${email}`});
        }

        const is_valid = bcrypt.compareSync(password, user.password);
        if (!is_valid) {
            return res.status(400).json({message: 'Incorrect password'});
        }
        
        const token = generateAcessToken(user.id, user.role_name, user.email);
        return res.status(200).send({token: token});
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};
