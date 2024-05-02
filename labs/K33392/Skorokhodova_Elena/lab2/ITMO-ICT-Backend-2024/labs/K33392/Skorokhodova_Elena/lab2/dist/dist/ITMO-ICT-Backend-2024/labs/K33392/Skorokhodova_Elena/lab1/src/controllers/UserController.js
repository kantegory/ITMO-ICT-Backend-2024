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
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = req.body;
            try {
                const user = yield UserService_1.UserService.createUser(name, email);
                res.status(201).json(user);
            }
            catch (error) {
                console.error('Error creating user:', error);
                res.status(500).send('Error creating user');
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            try {
                const user = yield UserService_1.UserService.getUserById(userId);
                if (!user) {
                    res.status(404).send('User not found');
                    return;
                }
                res.json(user);
            }
            catch (error) {
                console.error('Error getting user by id:', error);
                res.status(500).send('Error getting user');
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            try {
                const success = yield UserService_1.UserService.deleteUser(userId);
                if (!success) {
                    res.status(404).send('User not found');
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).send('Error deleting user');
            }
        });
    }
}
exports.UserController = UserController;
