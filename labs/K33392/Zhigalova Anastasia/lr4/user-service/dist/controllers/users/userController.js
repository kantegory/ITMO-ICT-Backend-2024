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
exports.UserController = void 0;
const userService_1 = require("../../services/users/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService = new userService_1.UserService();
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield userService.register(email, password);
                res.status(201).json(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield userService.login(email, password);
                res.status(200).json({ token });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    getUserWithOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization)
                    return res.sendStatus(401);
                const userId = req.params.id;
                if (!userId)
                    return res.status(400).send({ error: "userId was not provided" });
                const user = yield userService.getById(+userId);
                const resp = yield fetch(`${process.env.BASE_SERVICE_URL}/orders/users/${userId}`, { headers: { authorization: req.headers.authorization } });
                if (!resp.ok)
                    return res.sendStatus(401);
                return res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    orders: yield resp.json(),
                });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.body;
                if (!token)
                    return res.sendStatus(401);
                const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                const userId = payload.id;
                if (!userId)
                    return res.sendStatus(401);
                const user = yield userService.getById(userId);
                if (!user)
                    return res.sendStatus(401);
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(401);
            }
        });
    }
}
exports.UserController = UserController;
