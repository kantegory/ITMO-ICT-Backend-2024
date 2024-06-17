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
const users_1 = __importDefault(require("../model/users"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = "postgresql://postgres:2198@localhost:5443/market_bd";
if (url === undefined) {
    throw new Error;
}
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'sqlite',
    storage: './src/models/models.db'
});
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        // Handle the error appropriately (e.g., log and exit, retry)
    }
});
test();
const models = [users_1.default];
sequelize.addModels(models);
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
