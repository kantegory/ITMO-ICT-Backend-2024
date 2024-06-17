import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};
