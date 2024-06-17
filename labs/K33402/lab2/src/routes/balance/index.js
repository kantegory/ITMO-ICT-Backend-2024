"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const balance_1 = __importDefault(require("../../controllers/balance"));
const rout = express_1.default.Router();
const balance = new balance_1.default;
rout.route('/')
    .get(balance.get)
    .post(balance.create);
rout.route('/:id')
    .get(balance.getById)
    .post(balance.update);
rout.get('/user/:id', balance.getByUserId);
exports.default = rout;
