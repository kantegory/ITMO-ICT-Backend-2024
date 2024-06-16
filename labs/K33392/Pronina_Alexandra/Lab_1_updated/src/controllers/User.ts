import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

class UserController {
    static async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        try {
            const newUser = await UserService.createUser(name, email, password);
            res.status(201).json(newUser);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getUserById(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        try {
            const user = await UserService.getUserById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteUser(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        try {
            const deleted = await UserService.deleteUser(id);
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export { UserController };
