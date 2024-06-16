"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.settings = {
    database: process.env.DB_NAME || "some_db",
    dialect: process.env.DB_DIALECT || "sqlite",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    storage: process.env.DB_STORAGE || "db.sqlite",
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
};
//# sourceMappingURL=settings.js.map