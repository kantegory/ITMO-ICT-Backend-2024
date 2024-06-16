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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../models/users/User");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME || "some_db",
    dialect: process.env.DB_DIALECT || "sqlite",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    storage: process.env.DB_STORAGE || "db.sqlite",
    logging: console.log,
});
const models = [User_1.User];
sequelize.addModels(models);
sequelize
    .sync()
    .then(() => {
    console.log("synced models");
})
    .catch((e) => console.log(e));
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log("Connection has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
testConnection();
exports.default = sequelize;
