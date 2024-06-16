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
exports.OrdersController = void 0;
const orderService_1 = require("../../services/orders/orderService");
class OrdersController {
    constructor() {
        this.orderService = new orderService_1.OrderService();
    }
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, productId, quantity } = req.body;
                const order = yield this.orderService.createOrder(userId, productId, quantity);
                if (order) {
                    res.status(201).json(order);
                }
                else {
                    res.status(400).json({
                        message: "Unable to create order. Product may be out of stock or not found.",
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = req.params;
                const order = yield this.orderService.getOrderById(Number(orderId));
                if (order) {
                    res.status(200).json(order);
                }
                else {
                    res.status(404).json({ message: "Order not found" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    updateOrderQuantity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = req.params;
                const { newQuantity } = req.body;
                const updatedOrder = yield this.orderService.updateOrderQuantity(Number(orderId), newQuantity);
                if (updatedOrder) {
                    res.status(200).json(updatedOrder);
                }
                else {
                    res.status(400).json({
                        message: "Unable to update order. Product may be out of stock or not found.",
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = req.params;
                const success = yield this.orderService.deleteOrder(Number(orderId));
                if (success) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ message: "Order not found" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
    findOrdersByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield this.orderService.findOrdersByUserId(req.params.userId));
            }
            catch (error) {
                console.error("Error fetching user orders:", error);
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
}
exports.OrdersController = OrdersController;
