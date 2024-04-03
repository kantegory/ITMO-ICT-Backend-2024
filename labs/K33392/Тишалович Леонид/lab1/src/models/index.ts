import { Sequelize } from "sequelize";
import UserModel from "./User";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "your_usename",
  password: "your_password",
  database: "your_database_name",
});

const User = UserModel(sequelize);

export { sequelize, User };
