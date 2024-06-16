import { Request, Response } from "express";
import { UserService } from "../../services/users/userService";
import jwt, { JwtPayload } from "jsonwebtoken";

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.register(email, password);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
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
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async getUserWithOrders(req: Request, res: Response) {
    try {
      if (!req.headers.authorization) return res.sendStatus(401);
      const userId = req.params.id;
      if (!userId)
        return res.status(400).send({ error: "userId was not provided" });
      const user = await userService.getById(+userId);
      const resp = await fetch(
        `${process.env.BASE_SERVICE_URL}/orders/users/${userId}`,
        { headers: { authorization: req.headers.authorization } }
      );
      if (!resp.ok) return res.sendStatus(401);
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        orders: await resp.json(),
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const { token } = req.body;
      if (!token) return res.sendStatus(401);
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      const userId = (payload as JwtPayload).id;
      if (!userId) return res.sendStatus(401);
      const user = await userService.getById(userId);
      if (!user) return res.sendStatus(401);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
}
