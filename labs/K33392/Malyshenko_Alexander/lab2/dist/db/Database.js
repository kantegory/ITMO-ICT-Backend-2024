"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("../models/user/User"));
const sequelize = new sequelize_typescript_1.Sequelize({
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const models = [User_1.default];
sequelize.addModels(models);
sequelize.sync().then(() => console.log("models are synced")).catch((error) => console.log(error));
// TODO: add auth
exports.default = sequelize;
