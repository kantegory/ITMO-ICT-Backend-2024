"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../controllers/auth"));
const rout = express_1.default.Router();
const register = new auth_1.default;
rout.post('/registr', register.register);
rout.post('/auth', register.auth);
exports.default = rout;
