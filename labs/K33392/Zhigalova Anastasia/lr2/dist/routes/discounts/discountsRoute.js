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
const express_1 = __importDefault(require("express"));
const discountsController_1 = require("../../controllers/discounts/discountsController");
const router = express_1.default.Router();
const discountController = new discountsController_1.DiscountController();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    discountController.createDiscount(req, res);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    discountController.getDiscountById(req, res);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    discountController.getAllDiscounts(req, res);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    discountController.updateDiscount(req, res);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    discountController.deleteDiscount(req, res);
}));
router.post('/addProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    discountController.addProductToDiscount(req, res);
}));
router.post('/removeProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    discountController.removeProductFromDiscount(req, res);
}));
exports.default = router;
