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
exports.ExchangeRequestRepository = void 0;
const ExchangeRequest_1 = require("../models/ExchangeRequest");
class ExchangeRequestRepository {
    static createExchangeRequest(userId, exchangeWithUserId, bookId, bookTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ExchangeRequest_1.ExchangeRequest.create({ userId, exchangeWithUserId, bookId, bookTitle });
            }
            catch (error) {
                throw new Error('Ошибка при создании запроса на обмен');
            }
        });
    }
    static deleteExchangeRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield ExchangeRequest_1.ExchangeRequest.destroy({ where: { id: requestId } });
                return deletedCount > 0;
            }
            catch (error) {
                throw new Error('Ошибка при удалении запроса на обмен');
            }
        });
    }
    static getUserExchangeRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exchangeRequests = yield ExchangeRequest_1.ExchangeRequest.findAll({ where: { userId } });
                return exchangeRequests;
            }
            catch (error) {
                throw new Error('Ошибка при получении запросов на обмен');
            }
        });
    }
    static confirmExchangeRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [updatedCount] = yield ExchangeRequest_1.ExchangeRequest.update({ status: 'confirmed' }, { where: { id: requestId } });
                return updatedCount > 0;
            }
            catch (error) {
                throw new Error('Ошибка при подтверждении запроса на обмен');
            }
        });
    }
}
exports.ExchangeRequestRepository = ExchangeRequestRepository;
