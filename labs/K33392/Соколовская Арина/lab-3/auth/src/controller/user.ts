import { Request, Response } from "express"
import { UserService } from "../service/user";
import { User } from "../model/user";
import jwt from "jsonwebtoken"

const userService = new UserService();

exports.get_user = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await userService.findById(id);
    if (user === null) {
        res
            .status(404)
            .send({ error: 'User with the specified id not found' })
    } else {
        res.send(JSON.stringify(user));
    }
};

exports.patch_user = async (req: Request, res: Response) => {
    const user = req.body as User;
    const updated_user = await userService.patch(user);
    if (updated_user === null) {
        res
            .status(400)
            .send({ error: 'User was not updated' })
    } else {
        res.send(JSON.stringify(updated_user));
    }
};

exports.get_user_role_by_token = async (req: Request, res: Response) => {
    const token = req.body.token;
    try {
        const parsed = jwt.verify(token, process.env.secret_key as string);
        console.log(parsed);
        const user_role = (parsed as User).role_name;
        res.send(JSON.stringify(user_role));
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message)
        }
    }
};


exports.get_user_id_by_token = async (req: Request, res: Response) => {
    console.assert(req.body);
    const token = req.body.token;
    console.log(token);
    try {
        const parsed = jwt.verify(token, process.env.secret_key as string);
        console.log(parsed);
        const user_id = (parsed as User).id;
        res.send(JSON.stringify(user_id));
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message)
        }
    }
};
