import { Request, Response } from "express";
import UserService from "../services/UserServices";
import sequelize from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { reviewService } from "./ReviewController";
import { cartService } from "./CartController";

const userService = new UserService(sequelize);

export default class UserController {
  static async login(req: Request, res: Response) {
    try {
      const user = await userService.getUserByEmail(req.body.email);

      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      const isValidPass = await bcrypt.compare(
        req.body.password,
        user.passwordHash
      );

      if (!isValidPass) {
        return res.status(404).json({
          message: "Неверный логин или пароль",
        });
      }

      const token = jwt.sign(
        {
          _id: user.id,
        },
        "secret123",
        { expiresIn: "30d" }
      );

      const { passwordHash, ...userData } = user;
      res.json({
        ...userData,
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: "Не удалось авторизоваться",
      });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const doc = await userService.createUser({
        email: req.body.email,
        name: req.body.name,
        passwordHash: hash,
      });

      const user = await doc.save();

      const token = jwt.sign(
        {
          _id: user.id,
        },
        "secret123",
        { expiresIn: "30d" }
      );

      const { passwordHash, ...userData } = user;
      res.json({
        ...userData,
        token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserByEmail(req: Request, res: Response) {
    try {
      const userEmail = req.params.email;
      const user = await userService.getUserByEmail(userEmail);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const updatedUser = await userService.updateUser(userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      await userService.deleteUser(userId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserReviews(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const reviews = await reviewService.getAllReviews();
      const userReviews = reviews.filter((review) => review.userId === userId);
      res.json(userReviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserCart(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const carts = await cartService.getAllCarts();
      const userCart = carts.filter((cart) => cart.userId === userId);
      res.json(userCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
