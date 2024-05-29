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
exports.DiscountController = void 0;
const discountService_1 = require("../../services/discounts/discountService");
class DiscountController {
    constructor() {
        this.discountService = new discountService_1.DiscountService();
    }
    createDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discountData = req.body;
                const discount = yield this.discountService.createDiscount(discountData);
                res.status(201).json(discount);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    getDiscountById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const discount = yield this.discountService.getDiscountById(Number(id));
                if (discount) {
                    res.status(200).json(discount);
                }
                else {
                    res.status(404).json({ message: 'Discount not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    getAllDiscounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discounts = yield this.discountService.getAllDiscounts();
                res.status(200).json(discounts);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    updateDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const discountData = req.body;
                const updatedDiscount = yield this.discountService.updateDiscount(Number(id), discountData);
                if (updatedDiscount) {
                    res.status(200).json(updatedDiscount);
                }
                else {
                    res.status(404).json({ message: 'Discount not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    deleteDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const success = yield this.discountService.deleteDiscount(Number(id));
                if (success) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ message: 'Discount not found' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    addProductToDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { discountId, productId } = req.body;
                yield this.discountService.addProductToDiscount(discountId, productId);
                res.status(200).json({ message: 'Product added to discount successfully' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    removeProductFromDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.body;
                yield this.discountService.removeProductFromDiscount(productId);
                res.status(200).json({ message: 'Product removed from discount successfully' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
}
exports.DiscountController = DiscountController;
