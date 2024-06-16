import { Sequelize } from "sequelize-typescript";
import { User } from "../models/users/User";

const sequelize = new Sequelize({
  database: process.env.DB_NAME || "some_db",
  dialect:
    (process.env.DB_DIALECT as
      | "mysql"
      | "postgres"
      | "sqlite"
      | "mariadb"
      | "mssql") || "sqlite",
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  storage: process.env.DB_STORAGE || "db.sqlite",
  logging: console.log,
});

const models = [User];

sequelize.addModels(models);

sequelize
  .sync()
  .then(() => {
    console.log("synced models");
  })
  .catch((e) => console.log(e));

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

export default sequelize;
