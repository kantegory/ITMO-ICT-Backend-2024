"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRequestController = void 0;
const ExchangeRequestService_1 = require("../services/ExchangeRequestService");
class ExchangeRequestController {
    static createExchangeRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, bookId } = req.body;
            try {
                const request = yield ExchangeRequestService_1.ExchangeRequestService.createExchangeRequest(userId, bookId);
                res.status(201).json(request);
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
                const success = yield ExchangeRequestService_1.ExchangeRequestService.deleteExchangeRequest(requestId);
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
                const requests = yield ExchangeRequestService_1.ExchangeRequestService.getUserExchangeRequests(userId);
                res.json(requests);
            }
            catch (error) {
                console.error('Error getting user exchange requests:', error);
                res.status(500).send('Error getting user exchange requests');
            }
        });
    }
    static confirmExchangeRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestId = parseInt(req.params.id);
            try {
                const success = yield ExchangeRequestService_1.ExchangeRequestService.confirmExchangeRequest(requestId);
                if (success) {
                    res.status(200).send('Exchange request confirmed');
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
