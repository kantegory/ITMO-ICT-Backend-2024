import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

const UserController = { getUserById };
export { UserController };
