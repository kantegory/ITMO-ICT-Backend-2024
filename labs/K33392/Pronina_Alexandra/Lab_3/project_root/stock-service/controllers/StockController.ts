import { Request, Response } from 'express';
import { StockService } from '../services/StockService';

const stockService = new StockService();

export const updateStock = async (req: Request, res: Response) => {
    try {
        const { bookId, quantity } = req.body;
        await stockService.updateStock(bookId, quantity);
        res.status(200).send('Stock updated');
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

const StockController = { updateStock };
export { StockController };
