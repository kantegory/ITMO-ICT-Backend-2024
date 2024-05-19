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
const user_1 = __importDefault(require("../models/user"));
const bcrypt = require('bcrypt');
const jwt_1 = __importDefault(require("../utils/jwt"));
const errors_1 = require("../errors");
class AuthService {
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: yield bcrypt.hash(data.password, 10),
            }, { returning: true });
        });
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const user = yield user_1.default.findOne({ where: { email: data.email } });
            if (!user) {
                throw new Error('Not found user by email: ' + data.email);
            }
            if (!bcrypt.compareSync(data.password, user.password)) {
                throw new Error('Password is incorrect');
            }
            let accessToken = jwt_1.default.generateAccessToken(data.email);
            let refreshToken = jwt_1.default.generateRefreshToken(data.email);
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        });
    }
    static refreshToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user)
                throw new errors_1.UnauthenticatedError();
            let accessToken = jwt_1.default.generateAccessToken(user.email);
            let refreshToken = jwt_1.default.generateRefreshToken(user.email);
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        });
    }
}
exports.default = AuthService;
