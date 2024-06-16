import { Sequelize } from "sequelize-typescript";
import { Users } from "../models/users";
import RefreshToken from "../models/refreshToken";
// import dotenv from 'dotenv';
// dotenv.config();

const connection = new Sequelize({
    dialect: "sqlite",
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    storage: "./src/lab1.sqlite",
    logging: console.log,
});

const models = [Users, RefreshToken]

connection.addModels(models)

export default connection;

