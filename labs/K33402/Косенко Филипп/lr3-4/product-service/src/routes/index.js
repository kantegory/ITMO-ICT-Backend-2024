"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("./product"));
const cart_1 = __importDefault(require("./cart"));
const rout = express_1.default.Router();
rout.use('/product', product_1.default);
rout.use('/basket', cart_1.default);
exports.default = rout;
