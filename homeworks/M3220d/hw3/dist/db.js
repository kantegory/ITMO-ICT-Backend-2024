"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("./models/users/User"));
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'sqlite',
    host: 'localhost',
    port: 3000,
    username: 'username',
    password: '',
    database: 'dev_database'
});
sequelize.addModels([User_1.default]);
sequelize.sync();
exports.default = sequelize;
