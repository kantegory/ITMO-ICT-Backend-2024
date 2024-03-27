import { Sequelize } from "sequelize-typescript";
import { Users } from "../models/users";
import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize({
    dialect: "sqlite",
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    storage: "./src/lab1.sqlite",
    models:[Users]
});

export default connection;

