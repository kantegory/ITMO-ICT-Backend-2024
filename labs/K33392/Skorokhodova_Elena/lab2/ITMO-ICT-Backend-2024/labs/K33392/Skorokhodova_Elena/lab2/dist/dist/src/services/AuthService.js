"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = require("../repositories/UserRepository");
const ProfileService_1 = require("./ProfileService");
class AuthService {
    static register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield (0, UserRepository_1.getUserByEmail)(email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield (0, UserRepository_1.createUser)(name, email, hashedPassword);
            yield ProfileService_1.ProfileService.createOrUpdateProfile(newUser.id, '', '');
            return newUser;
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, UserRepository_1.getUserByEmail)(email);
            if (!user) {
                return null;
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                return null;
            }
            return user;
        });
    }
}
exports.AuthService = AuthService;
