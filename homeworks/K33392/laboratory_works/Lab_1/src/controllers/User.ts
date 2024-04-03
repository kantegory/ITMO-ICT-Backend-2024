import { Request, Response } from 'express';
import UserService from '../services/UserService';

export class UserController {
    static async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        try {
            const newUser = await UserService.createUser(name, email, password);
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    static async getUserById(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        try {
            const user = await UserService.getUserById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Пользователь не найден' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    static async deleteUser(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        try {
            await UserService.deleteUser(id);
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}
