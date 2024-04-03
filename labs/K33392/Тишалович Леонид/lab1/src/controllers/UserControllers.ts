import { Request, Response } from "express";
const UserService = require("../services/UserServices");

export default {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      await UserService.deleteUser(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
