import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "./models/User";
import Brand from "./models/Brand";
import Cart from "./models/Cart";
import Item from "./models/Item";
import Review from "./models/Review";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || "",
  username: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  repositoryMode: true,
});

sequelize.addModels([User, Brand, Cart, Item, Review]);

export default sequelize;
