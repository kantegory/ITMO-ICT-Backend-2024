"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const node_path_1 = __importDefault(require("node:path"));
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: node_path_1.default.resolve(__dirname, "../database.sqlite"),
});
console.log('pasha');
exports.sequelize.authenticate()
    .then(() => {
    console.log('Успешное подключение к базе данных');
})
    .catch(err => {
    console.error('Ошибка подключения к базе данных:', err);
});
