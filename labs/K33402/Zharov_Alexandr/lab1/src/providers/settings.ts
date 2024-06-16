import { SequelizeOptions } from "sequelize-typescript";
import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();

export const settings: SequelizeOptions = {
  database: process.env.DB_NAME || "some_db",
  dialect: (process.env.DB_DIALECT as Dialect) || "sqlite",
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  storage: process.env.DB_STORAGE || "db.sqlite",
  logging: process.env.DB_LOGGING === "true" ? console.log : false,
};
