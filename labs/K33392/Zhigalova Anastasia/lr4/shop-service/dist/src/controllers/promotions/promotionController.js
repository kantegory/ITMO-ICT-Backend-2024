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
const promotionService_1 = __importDefault(require("../../services/promotions/promotionService"));
class PromotionController {
    createPromotion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, startDate, endDate } = req.body;
                const promotion = yield promotionService_1.default.createPromotion(title, description, new Date(startDate), new Date(endDate));
                res.status(201).json(promotion);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    addProductToPromotion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { promotionId, productId } = req.params;
                yield promotionService_1.default.addProductToPromotion(Number(promotionId), Number(productId));
                res.status(200).json({ message: 'Product added to promotion successfully' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    removeProductFromPromotion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                yield promotionService_1.default.removeProductFromPromotion(Number(productId));
                res.status(200).json({ message: 'Product removed from promotion successfully' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    getProductsByPromotion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { promotionId } = req.params;
                const products = yield promotionService_1.default.getProductsByPromotion(Number(promotionId));
                res.status(200).json(products);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    getPromotionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { promotionId } = req.params;
                const promotion = yield promotionService_1.default.getPromotionById(Number(promotionId));
                if (!promotion) {
                    return res.status(404).json({ message: 'Promotion not found' });
                }
                res.status(200).json(promotion);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
}
exports.default = PromotionController;
