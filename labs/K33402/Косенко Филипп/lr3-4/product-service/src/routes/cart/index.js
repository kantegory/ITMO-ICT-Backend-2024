"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = __importDefault(require("../../controllers/cart"));
const rout = express_1.default.Router();
const basket = new cart_1.default();
rout.route('/')
    .get(basket.get)
    .post(basket.create);
rout.route('/:id')
    .get(basket.getById)
    .post(basket.update);
exports.default = rout;
