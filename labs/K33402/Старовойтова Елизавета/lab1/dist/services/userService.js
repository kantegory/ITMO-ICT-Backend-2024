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
const user_1 = __importDefault(require("../models/user"));
const errors_1 = require("../errors");
class UserService {
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findByPk(id);
            if (!user) {
                throw new errors_1.NotFoundError('User does not exists');
            }
            return user;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findAll();
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findByPk(id);
            if (!user) {
                throw new errors_1.NotFoundError('User does not exists');
            }
            yield user.destroy();
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = data;
            const user = yield user_1.default.findByPk(id);
            if (!user) {
                throw new errors_1.NotFoundError('User does not exists');
            }
            yield user.update({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });
            return user;
        });
    }
}
exports.default = UserService;
