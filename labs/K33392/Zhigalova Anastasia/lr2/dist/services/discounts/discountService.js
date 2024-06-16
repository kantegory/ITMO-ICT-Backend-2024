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
exports.DiscountService = void 0;
const Product_1 = require("../../models/products/Product");
const Discount_1 = require("../../models/discounts/Discount");
class DiscountService {
    createDiscount(discountData) {
        return __awaiter(this, void 0, void 0, function* () {
            const discount = yield Discount_1.Discount.create(discountData);
            return discount;
        });
    }
    getDiscountById(discountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const discount = yield Discount_1.Discount.findByPk(discountId, {
                include: [Product_1.Product]
            });
            return discount;
        });
    }
    getAllDiscounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const discounts = yield Discount_1.Discount.findAll({
                include: [Product_1.Product]
            });
            return discounts;
        });
    }
    updateDiscount(discountId, discountData) {
        return __awaiter(this, void 0, void 0, function* () {
            const discount = yield Discount_1.Discount.findByPk(discountId);
            if (discount) {
                yield discount.update(discountData);
            }
            return discount;
        });
    }
    deleteDiscount(discountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield Discount_1.Discount.destroy({
                where: { id: discountId }
            });
            return deleted > 0;
        });
    }
    addProductToDiscount(discountId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.Product.findByPk(productId);
            if (product) {
                yield product.update({ discountId: discountId });
            }
        });
    }
    removeProductFromDiscount(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.Product.findByPk(productId);
            if (product) {
                yield product.update({ discountId: null });
            }
        });
    }
}
exports.DiscountService = DiscountService;
