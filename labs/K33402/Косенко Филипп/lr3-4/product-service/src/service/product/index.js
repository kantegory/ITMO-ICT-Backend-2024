"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../models/product"));
class ProductServic {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = product_1.default.findAll();
                return result != undefined ? result : 'Sorry yuor DB is empty';
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_1.default.findByPk(id);
                return result;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    ;
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_1.default.create(productData);
                return product;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    ;
    getQuantity(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quantity = yield product_1.default.findByPk(productId);
                return quantity;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    ;
    update(productId, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_1.default.update({ category: productData.category, name: productData.name, price: productData.price, quantity: productData.quantity }, { where: { id: productId } });
                return result;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    ;
    subQuantity(productId, count) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_1.default.findByPk(productId);
                if (product === null) {
                    throw Error;
                }
                const nCount = product.quantity - count;
                const result = yield product_1.default.update({ quantity: nCount }, { where: { id: productId } });
                return result;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    ;
}
exports.default = ProductServic;
