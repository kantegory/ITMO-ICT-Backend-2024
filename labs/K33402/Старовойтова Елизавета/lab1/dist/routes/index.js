"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const users_1 = __importDefault(require("./users"));
const auth_1 = __importDefault(require("./auth"));
exports.routers = [
    { prefix: '/users', router: users_1.default },
    { prefix: '/auth', router: auth_1.default },
];
