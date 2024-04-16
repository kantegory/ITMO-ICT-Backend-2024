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
exports.UserRepository = void 0;
const User_1 = require("../models/User");
class UserRepository {
    static createUser(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.create({ name, email });
                return user;
            }
            catch (error) {
                throw new Error('Error creating user: ' + error.message);
            }
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findByPk(id);
                return user;
            }
            catch (error) {
                throw new Error('Error getting user by id: ' + error.message);
            }
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield User_1.User.destroy({ where: { id } });
                return deletedCount > 0;
            }
            catch (error) {
                throw new Error('Error deleting user: ' + error.message);
            }
        });
    }
}
exports.UserRepository = UserRepository;
