"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const currency_1 = __importDefault(require("./currency"));
const balance_1 = __importDefault(require("./balance"));
const auth_1 = __importDefault(require("./auth"));
const history_1 = __importDefault(require("./history"));
const rout = express_1.default.Router();
rout.use('/users', user_1.default);
rout.use('/currency', currency_1.default);
rout.use('/balance', balance_1.default);
rout.use('/history', history_1.default);
rout.use('/aut', auth_1.default);
exports.default = rout;
