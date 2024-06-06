"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// import { sqlite } from "sqlite3";
const users_1 = __importDefault(require("../models/users"));
const product_1 = __importDefault(require("../models/product"));
const basket_1 = __importDefault(require("../models/basket"));
const promotion_1 = __importDefault(require("../models/promotion"));
// import 'dotenv/config';
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'sqlite',
    storage: './src/models/models.db'
});
const models = [users_1.default, product_1.default, basket_1.default, promotion_1.default];
sequelize.addModels(models);
product_1.default.sync()
    .then(() => {
    console.log('Таблица Products успешно синхронизирована');
})
    .catch(err => {
    console.error('Ошибка при синхронизации таблицы Products:', err);
});
const testConection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('conect is good');
    }
    catch (err) {
        console.error('oups disconect', err);
    }
});
testConection();
exports.default = sequelize;
