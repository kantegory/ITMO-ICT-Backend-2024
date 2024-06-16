import { Request, Response } from 'express';
import { PaymentService } from '../services/PaymentService';
import { RabbitMQService } from '../services/RabbitMQService';

const paymentService = new PaymentService();

export const createPayment = async (req: Request, res: Response) => {
    try {
        const newPayment = req.body;
        const payment = await paymentService.createPayment(newPayment);
        res.status(201).json(payment);

        // Send message to RabbitMQ
        RabbitMQService.sendMessage('payment_created', JSON.stringify(payment));
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

const PaymentController = { createPayment };
export { PaymentController };
