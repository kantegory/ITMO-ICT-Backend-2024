"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../../controllers/product"));
const rout = express_1.default.Router();
const product = new product_1.default;
rout.route('/')
    .get(product.get)
    .post(product.create);
rout.get('/:id', product.getId);
rout.get('/getqua/:id', product.getQuantity);
rout.post('/update', product.update);
rout.post('/sub', product.subtraction);
exports.default = rout;
