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
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const user = yield AuthService_1.AuthService.register(name, email, password);
                res.status(201).json(user);
            }
            catch (error) {
                console.error('Error registering user:', error);
                res.status(500).send('Error registering user');
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield AuthService_1.AuthService.login(email, password);
                if (!user) {
                    res.status(401).send('Invalid email or password');
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                console.error('Error logging in:', error);
                res.status(500).send('Error logging in');
            }
        });
    }
}
exports.AuthController = AuthController;
