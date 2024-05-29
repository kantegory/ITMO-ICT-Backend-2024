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
exports.OrderService = void 0;
const Order_1 = require("../../models/orders/Order");
const Product_1 = require("../../models/products/Product");
class OrderService {
    createOrder(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_1.Product.findByPk(productId);
                if (!product || product.stockQuantity < quantity) {
                    console.error("Product is not available in sufficient quantity.");
                    return null;
                }
                const orderDate = new Date();
                const order = yield Order_1.Order.create({
                    userId,
                    productId,
                    quantity,
                    orderDate,
                });
                yield Product_1.Product.update({ stockQuantity: product.stockQuantity - quantity }, { where: { id: productId } });
                return order;
            }
            catch (error) {
                console.error("An error occurred while creating the order:", error);
                return null;
            }
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_1.Order.findByPk(orderId, { include: [Product_1.Product] });
                return order;
            }
            catch (error) {
                console.error("An error occurred while retrieving the order:", error);
                return null;
            }
        });
    }
    updateOrderQuantity(orderId, newQuantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_1.Order.findByPk(orderId);
                if (!order) {
                    console.error("Order not found.");
                    return null;
                }
                const product = yield Product_1.Product.findByPk(order.productId);
                if (!product || product.stockQuantity + order.quantity < newQuantity) {
                    console.error("Product is not available in sufficient quantity for update.");
                    return null;
                }
                const updatedStockQuantity = product.stockQuantity + order.quantity - newQuantity;
                yield Product_1.Product.update({ stockQuantity: updatedStockQuantity }, { where: { id: order.productId } });
                yield order.update({ quantity: newQuantity });
                return order;
            }
            catch (error) {
                console.error("An error occurred while updating the order:", error);
                return null;
            }
        });
    }
    deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_1.Order.findByPk(orderId);
                if (!order) {
                    console.error("Order not found.");
                    return false;
                }
                const product = yield Product_1.Product.findByPk(order.productId);
                if (product) {
                    yield Product_1.Product.update({ stockQuantity: product.stockQuantity + order.quantity }, { where: { id: order.productId } });
                }
                yield Order_1.Order.destroy({ where: { id: orderId } });
                return true;
            }
            catch (error) {
                console.error("An error occurred while deleting the order:", error);
                return false;
            }
        });
    }
    findOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Order_1.Order.findAll({ where: { userId: userId } });
            }
            catch (error) {
                console.error("Error fetching user orders:", error);
                throw error;
            }
        });
    }
}
exports.OrderService = OrderService;
