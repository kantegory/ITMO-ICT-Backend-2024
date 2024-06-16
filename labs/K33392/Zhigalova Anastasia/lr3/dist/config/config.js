"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 8080,
    db: {
        database: process.env.DB_NAME || 'some_db',
        dialect: process.env.DB_DIALECT || 'sqlite',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        storage: process.env.DB_STORAGE || 'db.sqlite',
    },
    secretKey: process.env.SECRET_KEY,
};
