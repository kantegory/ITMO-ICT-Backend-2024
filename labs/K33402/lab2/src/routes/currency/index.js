"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const currency_1 = __importDefault(require("../../controllers/currency"));
const rout = express_1.default.Router();
const currency = new currency_1.default;
rout.route('/')
    .get(currency.get)
    .post(currency.create);
rout.get('/:id', currency.getId);
rout.get('/getqua/:id', currency.getPrice);
rout.post('/update', currency.update);
// rout.post('/sub', product.subtraction);
exports.default = rout;
