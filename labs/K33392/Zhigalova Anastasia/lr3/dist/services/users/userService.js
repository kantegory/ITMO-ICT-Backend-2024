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
exports.UserService = void 0;
const User_1 = require("../../models/users/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
class UserService {
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
            const user = yield User_1.User.create({ email, password: hashedPassword });
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                throw new Error("User not found");
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, secretKey);
            return token;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findByPk(id);
        });
    }
}
exports.UserService = UserService;
