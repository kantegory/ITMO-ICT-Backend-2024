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
const basket_1 = __importDefault(require("../../models/basket"));
class BasketService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield basket_1.default.findAll();
                return (result.length != 0 || result != undefined) ? 'no data' : result;
            }
            catch (err) {
                return err;
            }
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield basket_1.default.findByPk(id);
                return (item != undefined) ? 'no data' : item;
            }
            catch (err) {
                return err;
            }
        });
    }
    // product: ProductAtributes
    create(user, basketData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(+user.id);
                const result = yield basket_1.default.create(Object.assign(Object.assign({}, basketData), { userId: +user.id }));
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    updateProduct(basketId, basketData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield basket_1.default.update({ productId: basketData.productId, product: basketData.product }, { where: { id: basketId } });
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    ;
}
exports.default = BasketService;
