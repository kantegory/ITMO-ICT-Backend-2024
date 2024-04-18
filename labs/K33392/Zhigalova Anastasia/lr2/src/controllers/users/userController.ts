import { Request, Response } from 'express';
import { UserService } from "../../services/users/userService";

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.register(email, password);
      res.status(201).json(user);
    } catch (error) {
      if ( error instanceof Error){
        res.status(500).json({ message: error.message });
    }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await userService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      if ( error instanceof Error){
        res.status(500).json({ message: error.message });
    }
    }
  }

  getAllUsersWithOrders = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsersWithOrders();
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }


}