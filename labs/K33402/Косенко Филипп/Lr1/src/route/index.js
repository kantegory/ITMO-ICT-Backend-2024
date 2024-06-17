"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller"));
const registrApi_1 = __importDefault(require("../auth/registrApi"));
const authApi_1 = __importDefault(require("../auth/authApi"));
const expressRout = express_1.default.Router();
const baseUrl = new controller_1.default;
const registrPost = registrApi_1.default;
const authApi = authApi_1.default;
expressRout.get('/', baseUrl.get);
expressRout.post('/finde', baseUrl.finde);
expressRout.post('/post', registrPost);
expressRout.post('/auth', authApi);
exports.default = expressRout;
