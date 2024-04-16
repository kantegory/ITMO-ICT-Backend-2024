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
exports.ExchangeRequestService = void 0;
const ExchangeRequest_1 = require("../models/ExchangeRequest");
class ExchangeRequestService {
    static createExchangeRequest(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield ExchangeRequest_1.ExchangeRequest.create({ userId, bookId });
            return request;
        });
    }
    static deleteExchangeRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield ExchangeRequest_1.ExchangeRequest.destroy({ where: { id: requestId } });
            return deletedCount > 0;
        });
    }
    static getUserExchangeRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const requests = yield ExchangeRequest_1.ExchangeRequest.findAll({ where: { userId } });
            return requests;
        });
    }
    static confirmExchangeRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [updatedCount] = yield ExchangeRequest_1.ExchangeRequest.update({ confirmed: true }, { where: { id: requestId } });
                return updatedCount > 0;
            }
            catch (error) {
                console.error('Error confirming exchange request:', error);
                throw new Error('Error confirming exchange request');
            }
        });
    }
}
exports.ExchangeRequestService = ExchangeRequestService;
