import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    try {
      const user = await AuthService.register(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Error registering user');
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const user = await AuthService.login(email, password);
      if (!user) {
        res.status(401).send('Invalid email or password');
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Error logging in');
    }
  }
}

export { AuthController };
