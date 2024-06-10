import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await userService.createUser({ username, email, password });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await userService.getUserById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const deletedUser = await userService.deleteUser(userId);
      if (deletedUser) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export { UserController };
