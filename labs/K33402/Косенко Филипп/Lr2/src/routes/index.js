"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userServis_1 = __importDefault(require("../controllers/user/userServis"));
const product_1 = __importDefault(require("../controllers/product"));
const basket_1 = __importDefault(require("../controllers/basket"));
const auth_1 = __importDefault(require("../controllers/auth"));
const rout = express_1.default.Router();
const userServis = new userServis_1.default;
const product = new product_1.default;
const basket = new basket_1.default;
const register = new auth_1.default;
// Rout for User
rout.get('/hello', userServis.get);
rout.post('/creu', userServis.create);
rout.get('/user/:id', userServis.getId);
// Rout for product
rout.get('/product', product.get);
rout.get('/get/:id', product.getId);
rout.post('/create', product.create);
rout.get('/:id', product.getQuantity);
rout.post('/up', product.update);
rout.post('/sub', product.subtraction);
// Rout for basket
rout.get('/basket', basket.get);
rout.get('/bas/:id', basket.getById);
rout.post('/basket/create', basket.create);
// Rout for auth
rout.post('/registr', register.register);
rout.post('/auth', register.auth);
exports.default = rout;
