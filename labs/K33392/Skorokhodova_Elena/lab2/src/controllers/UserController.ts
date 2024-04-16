import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { ProfileService } from '../services/ProfileService'; 

class UserController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body; 
    try {
      const user = await UserService.createUser(name, email, password); 
      
      await ProfileService.createOrUpdateProfile(user.id, '', ''); 
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user');
    }
  }

  public static async getUserById(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id);
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        res.status(404).send('User not found');
        return;
      }
      res.json(user);
    } catch (error) {
      console.error('Error getting user by id:', error);
      res.status(500).send('Error getting user');
    }
  }

  public static async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id);
    try {
      const success = await UserService.deleteUser(userId);
      if (!success) {
        res.status(404).send('User not found');
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Error deleting user');
    }
  }
}

export { UserController };