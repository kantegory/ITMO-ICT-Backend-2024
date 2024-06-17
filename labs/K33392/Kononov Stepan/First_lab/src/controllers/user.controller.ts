import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../models/user.entity';

const userService = new UserService();

export class UserController {
    async getAllUsers(req: Request, res: Response) {
        const users = await userService.findAll();
        res.json(users);
    }

    async createUser(req: Request, res: Response) {
        const user = req.body as User;
        const newUser = await userService.create(user);
        res.status(201).json(newUser);
    }

    async updateUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const user = req.body as Partial<User>;
        await userService.update(id, user);
        res.status(204).end();
    }

    async deleteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await userService.delete(id);
        res.status(204).end();
    }
}
