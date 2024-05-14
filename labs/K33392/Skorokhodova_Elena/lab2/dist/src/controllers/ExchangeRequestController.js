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
exports.ExchangeRequestController = void 0;
const ExchangeRequestRepository_1 = require("../repositories/ExchangeRequestRepository");
class ExchangeRequestController {
    static createExchangeRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, exchangeWithUserId, bookId, bookTitle } = req.body;
            try {
                yield ExchangeRequestRepository_1.ExchangeRequestRepository.createExchangeRequest(userId, exchangeWithUserId, bookId, bookTitle);
                res.status(201).send('Exchange request created successfully');
            }
            catch (error) {
                console.error('Error creating exchange request:', error);
                res.status(500).send('Error creating exchange request');
            }
        });
    }
    static deleteExchangeRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestId = parseInt(req.params.id);
            try {
                const success = yield ExchangeRequestRepository_1.ExchangeRequestRepository.deleteExchangeRequest(requestId);
                if (success) {
                    res.status(204).send();
                }
                else {
                    res.status(404).send('Exchange request not found');
                }
            }
            catch (error) {
                console.error('Error deleting exchange request:', error);
                res.status(500).send('Error deleting exchange request');
            }
        });
    }
    static getUserExchangeRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            try {
                const exchangeRequests = yield ExchangeRequestRepository_1.ExchangeRequestRepository.getUserExchangeRequests(userId);
                res.json(exchangeRequests);
            }
            catch (error) {
                console.error('Error fetching exchange requests:', error);
                res.status(500).send('Error fetching exchange requests');
            }
        });
    }
    static confirmExchangeRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestId = parseInt(req.params.id);
            try {
                const success = yield ExchangeRequestRepository_1.ExchangeRequestRepository.confirmExchangeRequest(requestId);
                if (success) {
                    res.status(200).send('Exchange request confirmed successfully');
                }
                else {
                    res.status(404).send('Exchange request not found');
                }
            }
            catch (error) {
                console.error('Error confirming exchange request:', error);
                res.status(500).send('Error confirming exchange request');
            }
        });
    }
}
exports.ExchangeRequestController = ExchangeRequestController;
