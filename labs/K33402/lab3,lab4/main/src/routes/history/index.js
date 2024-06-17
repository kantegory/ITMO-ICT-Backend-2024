"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const history_1 = __importDefault(require("../../controllers/history"));
const express_1 = __importDefault(require("express"));
const rout = express_1.default.Router();
const history = new history_1.default();
rout.get('/:id', history.get);
exports.default = rout;
