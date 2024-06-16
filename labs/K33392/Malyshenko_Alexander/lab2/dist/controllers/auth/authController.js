"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userMapper_1 = __importDefault(require("../../mapper/user/userMapper"));
class AuthController {
    constructor(userService) {
        this.userMapper = new userMapper_1.default();
        this.userService = userService;
    }
}
exports.default = AuthController;
