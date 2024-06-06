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
const users_1 = __importDefault(require("../../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkPas_1 = __importDefault(require("./checkPas"));
class AuthServis {
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield users_1.default.create(userData);
                return { id: result.id };
            }
            catch (err) {
                return err;
            }
        });
    }
    ;
    auth(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.findOne({ where: { email } });
                if (!user || !(0, checkPas_1.default)(user, password)) {
                    throw new Error('Email or password is not correct');
                }
                ;
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, "TEST_MARKET_FOR_LESSON", { expiresIn: "1d" });
                return { token: token };
            }
            catch (err) {
                return err;
            }
        });
    }
    ;
}
exports.default = AuthServis;
