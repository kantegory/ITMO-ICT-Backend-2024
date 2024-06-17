"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userServis_1 = __importDefault(require("../controllers/user/userServis"));
const rout = express_1.default.Router();
const userServis = new userServis_1.default;
rout.get('/user', userServis.getAll);
exports.default = rout;
