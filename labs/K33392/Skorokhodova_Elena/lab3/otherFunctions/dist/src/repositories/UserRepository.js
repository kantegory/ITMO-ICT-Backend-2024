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
exports.getUserByEmail = exports.deleteUser = exports.getUserById = exports.createUser = void 0;
const User_1 = require("../models/User");
const createUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.create({ name, email, password });
    return user;
});
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { email } });
    return user;
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByPk(id);
        return user;
    }
    catch (error) {
        throw new Error('Error getting user by id: ' + error.message);
    }
});
exports.getUserById = getUserById;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCount = yield User_1.User.destroy({ where: { id } });
        return deletedCount > 0;
    }
    catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
});
exports.deleteUser = deleteUser;
