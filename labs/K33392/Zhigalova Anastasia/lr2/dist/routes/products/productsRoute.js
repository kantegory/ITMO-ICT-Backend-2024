"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = __importDefault(require("../../controllers/products/productsController"));
const router = express_1.default.Router();
const productsController = new productsController_1.default();
router.post('/', (req, res) => {
    productsController.createProduct(req, res);
});
router.get('/:productId', (req, res) => {
    productsController.getProductById(req, res);
});
router.get('/', (req, res) => {
    productsController.getAllProducts(req, res);
});
router.put('/:productId', (req, res) => {
    productsController.updateProduct(req, res);
});
router.delete('/:productId', (req, res) => {
    productsController.deleteProduct(req, res);
});
router.get('/:productId/orders', (req, res) => {
    productsController.getOrdersByProductId(req, res);
});
router.get('/:productId/stock', (req, res) => {
    productsController.getProductStockQuantity(req, res);
});
exports.default = router;
