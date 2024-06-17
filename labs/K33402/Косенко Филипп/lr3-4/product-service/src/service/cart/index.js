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
const product_1 = __importDefault(require("../../models/product"));
// import User, { UserAtributes } from "../../models/users";
class BasketService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield basket_1.default.findAll();
                return (result.length === 0 || result === undefined) ? 'no data' : result;
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
                return item;
            }
            catch (err) {
                return err;
            }
        });
    }
    ;
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield basket_1.default.findAll({ where: { userId: userId } });
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    ;
    create(userId, productId, basketData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const user: any = await User.findOne({where: {id: userId}});
                const product = yield product_1.default.findOne({ where: { id: productId } });
                const result = yield basket_1.default.create(Object.assign(Object.assign({}, basketData), { userId: userId, productId: product.id, productName: product.name }));
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
