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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
class UserService {
    static createUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.create({ name, email, password });
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.findByPk(id);
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield User_1.User.destroy({ where: { id } });
            return deletedCount > 0;
        });
    }
}
exports.UserService = UserService;
