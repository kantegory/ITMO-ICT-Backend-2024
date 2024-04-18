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
const productService_1 = require("../../services/products/productService");
class ProductsController {
    constructor() {
        this.productService = new productService_1.ProductService();
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = req.body;
                const product = yield this.productService.createProduct(productData);
                res.status(201).json(product);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                const product = yield this.productService.getProductById(Number(productId));
                if (product) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(this.productService);
                const products = yield this.productService.getAllProducts();
                res.status(200).json(products);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error });
                }
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const productData = req.body;
                const updatedProduct = yield this.productService.updateProduct(Number(productId), productData);
                if (updatedProduct) {
                    res.status(200).json(updatedProduct);
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const success = yield this.productService.deleteProduct(Number(productId));
                if (success) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    getOrdersByProductId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const orders = yield this.productService.getOrdersByProductId(Number(productId));
                if (orders) {
                    res.status(200).json(orders);
                }
                else {
                    res.status(404).json({ message: 'Orders for the product not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    getProductStockQuantity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const product = yield this.productService.getProductById(Number(productId));
                if (product) {
                    res.status(200).json({ stockQuantity: product.stockQuantity });
                }
                else {
                    res.status(404).json({ message: 'Product not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
}
exports.default = ProductsController;
