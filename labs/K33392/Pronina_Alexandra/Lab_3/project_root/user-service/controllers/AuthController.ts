import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        if (token) {
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

const AuthController = { register, login };
export { AuthController };
