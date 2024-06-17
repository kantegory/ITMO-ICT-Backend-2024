import { Request, Response } from 'express';
import PurchaseService from '../services/PurchaseService';

class PurchaseController {
    static async purchaseProduct(req: Request, res: Response) {
        try {
            const { userId, productId, quantity } = req.body;
            const purchase = await PurchaseService.purchaseProduct(userId, productId, quantity);
            res.status(201).json(purchase);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getPurchaseHistory(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const purchases = await PurchaseService.getPurchaseHistory(userId);
            res.status(200).json(purchases);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default PurchaseController;