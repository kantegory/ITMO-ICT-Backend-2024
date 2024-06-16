import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { RabbitMQService } from '../services/RabbitMQService';

const orderService = new OrderService();

export const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder = req.body;
        const order = await orderService.createOrder(newOrder);
        res.status(201).json(order);

        // Send message to RabbitMQ
        RabbitMQService.sendMessage('order_created', JSON.stringify(order));
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

const OrderController = { createOrder };
export { OrderController };
