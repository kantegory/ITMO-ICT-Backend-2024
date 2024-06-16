"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promotionController_1 = __importDefault(require("../../controllers/promotions/promotionController"));
const router = express_1.default.Router();
const promotionController = new promotionController_1.default();
router.post('/', (req, res) => {
    promotionController.createPromotion(req, res);
});
router.post('/:promotionId/products/:productId', (req, res) => {
    promotionController.addProductToPromotion(req, res);
});
router.delete('/products/:productId', (req, res) => {
    promotionController.removeProductFromPromotion(req, res);
});
router.get('/:promotionId/products', (req, res) => {
    promotionController.getProductsByPromotion(req, res);
});
router.get('/:promotionId', (req, res) => {
    promotionController.getPromotionById(req, res);
});
exports.default = router;
