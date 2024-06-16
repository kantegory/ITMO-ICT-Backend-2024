import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { settings } from "./settings";
import { Unicorn } from "../models/unicorns";

const sequelize = new Sequelize(settings);

const models = [Unicorn];

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
