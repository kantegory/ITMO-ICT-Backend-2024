import { Order } from '../models/Order';

export class OrderService {
    async createOrder(order: Partial<Order>) {
        return await Order.create(order);
    }
}
