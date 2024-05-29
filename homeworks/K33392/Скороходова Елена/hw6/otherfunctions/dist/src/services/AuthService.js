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
exports.AuthService = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = __importDefault(require("process"));
class AuthService {
    static registerUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield User_1.User.findOne({ where: { email } });
                if (existingUser) {
                    throw new Error("User with this email already exists");
                }
                const newUser = yield User_1.User.create({
                    name,
                    email,
                    password,
                });
                const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, process_1.default.env.JWT_SECRET_KEY, {
                    expiresIn: "1h",
                });
                return token;
            }
            catch (error) {
                console.error("Error registering user:", error);
                throw new Error("Error registering user");
            }
        });
    }
    static loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ where: { email } });
                if (!user) {
                    throw new Error("Invalid email");
                }
                const passwordMatch = yield user.checkPassword(password);
                console.log("passwordMatch:", passwordMatch);
                if (!passwordMatch) {
                    throw new Error("Invalid password");
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, process_1.default.env.JWT_SECRET_KEY, {
                    expiresIn: "1h",
                });
                return token;
            }
            catch (error) {
                console.error("Error logging in:", error);
                throw new Error("Error logging in");
            }
        });
    }
}
exports.AuthService = AuthService;
