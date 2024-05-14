import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import jwt, { JwtPayload } from "jsonwebtoken";

class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const token = await AuthService.registerUser(name, email, password);
      res.status(201).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await AuthService.loginUser(email, password);
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(401).json({ error: "An unknown error occurred" });
      }
    }
  }

  static async verify(req: Request, res: Response): Promise<void> {
    try {
      const token = req.body.token;
      if (!token) {
        res.status(400).json({ error: "token was not provided" });
        return;
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      const userId = (payload as JwtPayload).userId;
      if (!userId) {
        res.status(400).json({ error: "invalid token" });
      }
      await UserService.getUserById(userId);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ error: "invalid token" });
    }
  }
}

export { AuthController };
