import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Item } from '../entities/Item';
import { Order } from '../entities/Order';

class OrderController {
    static async placeOrder(req: Request, res: Response) {
        try {
            const { userId, itemId, quantity } = req.body;

            const itemRepository = getRepository(Item);
            const orderRepository = getRepository(Order);

            const item = await itemRepository.findOne({ where: { id: itemId } });
            if (!item || item.stock < quantity) {
                throw new Error('Insufficient stock');
            }

            item.stock -= quantity;
            await itemRepository.save(item);

            const newOrder = orderRepository.create({
                userId,
                item,
                quantity,
                date: new Date()
            });
            await orderRepository.save(newOrder);

            res.status(201).json(newOrder);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getOrderHistory(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const orderRepository = getRepository(Order);
            const orders = await orderRepository.find({ where: { userId }, relations: ['item'] });
            res.status(200).json(orders);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default OrderController;
