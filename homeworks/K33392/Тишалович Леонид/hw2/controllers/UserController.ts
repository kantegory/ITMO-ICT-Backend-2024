import { Request, Response } from "express";
import User, { UserAttributes } from "../models/User";
import { request } from "http";

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const userData: Partial<UserAttributes> = {
        name: req.body.name,
        email: req.body.email,
      };
      const newUser = await User.create(userData as UserAttributes);
      res.status(201).json(newUser.toJSON());
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  }
  async update(req: Request, res: Response) {
    try {
      console.log("1");
      const userId = parseInt(req.params.id, 10);

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.update({
        name: req.body.name,
        email: req.body.email,
      });

      res.json(user.toJSON());
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.destroy();

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Error deleting user" });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user.toJSON());
    } catch (error) {
      console.error("Error getting user by id:", error);
      res.status(500).json({ error: "Error getting user by id" });
    }
  }
  async getByEmail(req: Request, res: Response) {
    try {
      const userEmail = req.params.email;

      const user = await User.findOne({ where: { email: userEmail } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user.toJSON());
    } catch (error) {
      console.error("Error getting user by email:", error);
      res.status(500).json({ error: "Error getting user by email" });
    }
  }
}
