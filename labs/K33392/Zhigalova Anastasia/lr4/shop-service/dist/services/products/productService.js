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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_1 = require("../../models/products/Product");
const Order_1 = require("../../models/orders/Order");
class ProductService {
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.Product.create(productData);
            return product;
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.Product.findByPk(productId, {
                include: [Order_1.Order]
            });
            return product;
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield Product_1.Product.findAll({
                include: [Order_1.Order]
            });
            return products;
        });
    }
    updateProduct(productId, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.Product.findByPk(productId);
            if (product) {
                yield product.update(productData);
            }
            return product;
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield Product_1.Product.destroy({
                where: { id: productId }
            });
            return deleted > 0;
        });
    }
    getOrdersByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.Product.findByPk(productId, {
                include: [Order_1.Order]
            });
            if (product && product.orders) {
                return product.orders;
            }
            else {
                return null;
            }
        });
    }
}
exports.ProductService = ProductService;
