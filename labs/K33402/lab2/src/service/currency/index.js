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
const currency_1 = __importDefault(require("../../models/currency"));
const history_1 = __importDefault(require("../../models/history"));
class CurrancyServic {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = currency_1.default.findAll();
                return result != undefined ? result : 'Sorry yuor DB is empty';
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield currency_1.default.findByPk(id);
                return result;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    ;
    createCurrancy(currencyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currency = yield currency_1.default.create(currencyData);
                return currency;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    ;
    updatePrice(currencyId, newPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const laterPrice = yield currency_1.default.findByPk(currencyId);
                const historyItem = yield history_1.default.create(Object.assign(Object.assign({}, laterPrice), { idCurrency: laterPrice.id, nameCur: laterPrice.name, priceCur: laterPrice.price }));
                const result = yield currency_1.default.update({ price: newPrice }, { where: { id: currencyId } });
                console.log(historyItem);
                return result;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    ;
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield currency_1.default.destroy({ where: { id: id } });
                return result;
            }
            catch (_a) {
                return Error;
            }
        });
    }
}
exports.default = CurrancyServic;
