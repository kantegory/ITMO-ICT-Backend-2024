"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordHandler {
    hashPassword(password) {
        return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(8));
    }
    decryptPassword(hashedPassword) {
        return true;
    }
}
exports.default = PasswordHandler;
