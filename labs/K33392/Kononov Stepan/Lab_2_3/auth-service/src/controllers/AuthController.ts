import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const user = await AuthService.register(req.body.username, req.body.password);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { token } = await AuthService.login(req.body.username, req.body.password);
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default AuthController;