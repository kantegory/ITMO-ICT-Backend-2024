import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";
import { Brand } from "./models/Brand";
import { Cart } from "./models/Cart";
import { Item } from "./models/Item";
import { Review } from "./models/Review";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  repositoryMode: true,
});

sequelize.addModels([User, Brand, Cart, Item, Review]);

export default sequelize;
