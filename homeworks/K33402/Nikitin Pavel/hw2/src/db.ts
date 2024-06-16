import path from "node:path";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../database.sqlite"),
});

sequelize.authenticate()
  .then(() => {
    console.log('Успешное подключение к базе данных');
  })
  .catch(err => {
    console.error('Ошибка подключения к базе данных:', err);
  })