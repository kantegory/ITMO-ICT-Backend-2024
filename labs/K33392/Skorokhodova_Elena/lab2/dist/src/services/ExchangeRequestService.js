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
const ExchangeRequestRepository_1 = require("../repositories/ExchangeRequestRepository");
class ExchangeRequestService {
    static createExchangeRequest(userId, exchangeWithUserId, bookId, bookTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ExchangeRequestRepository_1.ExchangeRequestRepository.createExchangeRequest(userId, exchangeWithUserId, bookId, bookTitle);
            }
            catch (error) {
                throw new Error('Error creating exchange request');
            }
        });
    }
    static deleteExchangeRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ExchangeRequestRepository_1.ExchangeRequestRepository.deleteExchangeRequest(requestId);
            }
            catch (error) {
                throw new Error('Error deleting exchange request');
            }
        });
    }
    static getUserExchangeRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ExchangeRequestRepository_1.ExchangeRequestRepository.getUserExchangeRequests(userId);
            }
            catch (error) {
                throw new Error('Error fetching exchange requests');
            }
        });
    }
    static confirmExchangeRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ExchangeRequestRepository_1.ExchangeRequestRepository.confirmExchangeRequest(requestId);
            }
            catch (error) {
                throw new Error('Error confirming exchange request');
            }
        });
    }
}
exports.ExchangeRequestService = ExchangeRequestService;
