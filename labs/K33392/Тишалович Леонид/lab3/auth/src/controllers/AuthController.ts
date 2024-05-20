import { Request, Response } from "express";
import UserService from "../services/UserService";
import sequelize from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const userService = new UserService(sequelize);

export default class AuthController {
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
}
