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
const balance_1 = __importDefault(require("../../models/balance"));
const currency_1 = __importDefault(require("../../models/currency"));
const users_1 = __importDefault(require("../../models/users"));
class BalanceService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield balance_1.default.findAll();
                return (result.length === 0 || result === undefined) ? 'no data' : result;
                // return result
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
                const item = yield balance_1.default.findByPk(id);
                return item;
            }
            catch (err) {
                return err;
            }
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield balance_1.default.findAll({ where: { userId: userId } });
                return item;
            }
            catch (err) {
                return err;
            }
        });
    }
    // product: ProductAtributes
    create(userId, currencyId, basketData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.findOne({ where: { id: userId } });
                const currancy = yield currency_1.default.findOne({ where: { id: currencyId } });
                const result = yield balance_1.default.create(Object.assign(Object.assign({}, basketData), { userId: user.id, userName: user.name, currencyId: currancy.id, currency: currancy.name }));
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    update(balanceId, balanceData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield balance_1.default.update({ currency: balanceData.currency, currencyId: balanceData.currencyId, count: balanceData.count }, { where: { id: balanceId } });
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    ;
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield balance_1.default.destroy({ where: { id: id } });
                return result;
            }
            catch (_a) {
                return Error;
            }
        });
    }
}
exports.default = BalanceService;
