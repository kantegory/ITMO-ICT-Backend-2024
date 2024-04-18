import express, { Application } from "express";
import sequelize from "./database";
import router from "./routes";
import User from "./models/User";
import UserService from "./services/UserServices";
import ItemService from "./services/ItemServices";
import BrandService from "./services/BrandServices";
import Cart from "./models/Cart";
import CartService from "./services/CartServices";
import { Request, Response } from "express";
import { registerValidation } from "./validations/auth";
import { validationResult } from "express-validator";
import ReviewService from "./services/ReviewServices";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PORT: number = parseInt(process.env.PORT || "5000");

const app: Application = express();

app.use(express.json());

app.use("/api", router);

const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    UserService.initialize(sequelize);
    ItemService.initialize(sequelize);
    BrandService.initialize(sequelize);
    CartService.initialize(sequelize);
    ReviewService.initialize(sequelize);

    app.post("/auth/login", async (req: Request, res: Response) => {
      try {
        const user = await UserService.getUserByEmail(req.body.email);

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
    });

    app.post(
      "/auth/register",
      registerValidation,
      async (req: Request, res: Response) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
          }

          const password = req.body.password;
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);

          const doc = await UserService.createUser({
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
    );
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
  });
};

start();
