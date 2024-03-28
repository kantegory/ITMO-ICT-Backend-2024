"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = require("../models/users");
const refreshToken_1 = __importDefault(require("../models/refreshToken"));
// import dotenv from 'dotenv';
// dotenv.config();
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "sqlite",
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    storage: "./src/lab1.sqlite",
    logging: console.log,
});
const models = [users_1.Users, refreshToken_1.default];
connection.addModels(models);
exports.default = connection;
