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
exports.updateUsers = exports.getAllUsers = exports.getUserById = exports.deleteUser = exports.login = exports.createUser = void 0;
const users_1 = require("../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_1.Users.create(userData);
});
exports.createUser = createUser;
const login = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.Users.findOne({ where: { username: userData.username } });
        if (!user) {
            throw new Error("User is not exist");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Password is not correct");
        }
        else {
            const token = jsonwebtoken_1.default.sign({ username: userData.username }, process.env.SECRET_KEY || '');
            return { username: user.username, token };
        }
    }
    catch (error) {
        console.error("Error occurred while logging in:", error);
        throw error;
    }
});
exports.login = login;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userToDelete = yield users_1.Users.findByPk(id);
    if (!userToDelete)
        throw new Error("User not found");
    yield users_1.Users.destroy({ where: { id } });
    return userToDelete;
});
exports.deleteUser = deleteUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_1.Users.findByPk(id);
});
exports.getUserById = getUserById;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_1.Users.findAll();
});
exports.getAllUsers = getAllUsers;
const updateUsers = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_1.Users.update(userData, { where: { id } });
    return yield users_1.Users.findByPk(id);
});
exports.updateUsers = updateUsers;
