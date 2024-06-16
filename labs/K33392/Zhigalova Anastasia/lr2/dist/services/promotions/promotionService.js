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
const Promotion_1 = require("../../models/promotions/Promotion");
const Product_1 = require("../../models/products/Product");
class PromotionService {
    createPromotion(title, description, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotion = yield Promotion_1.Promotion.create({
                title,
                description,
                startDate,
                endDate,
            });
            return promotion;
        });
    }
    addProductToPromotion(promotionId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotion = yield Promotion_1.Promotion.findByPk(promotionId);
            if (!promotion) {
                throw new Error('Promotion not found');
            }
            const product = yield Product_1.Product.findByPk(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            yield product.update({ promotionId });
        });
    }
    removeProductFromPromotion(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.Product.findByPk(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            yield product.update({ promotionId: null });
        });
    }
    getProductsByPromotion(promotionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotion = yield Promotion_1.Promotion.findByPk(promotionId, {
                include: [Product_1.Product],
            });
            if (!promotion) {
                throw new Error('Promotion not found');
            }
            return promotion.products;
        });
    }
    getPromotionById(promotionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotion = yield Promotion_1.Promotion.findByPk(promotionId);
            return promotion;
        });
    }
}
exports.default = new PromotionService();
