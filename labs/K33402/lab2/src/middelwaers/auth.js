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
exports.auth = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../service/users"));
// import 'dotenv/config';
// if (!process.env.SECRET_KEY) {
//   throw new Error('Missing SECRET_KEY in environment variables');
// }
exports.SECRET_KEY = "TEST_MARKET_FOR_LESSON";
const userService = new users_1.default();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error('Missing token');
        }
        const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
        const userData = yield userService.getIdWithPassword(decoded.id);
        if (!userData) {
            throw new Error('User not found');
        }
        req.user = userData;
        next();
    }
    catch (err) {
        res.status(401).send({ "error": 'Please authenticate' });
    }
});
exports.auth = auth;
