import { Request, Response } from 'express';
import PromotionService from '../../services/promotions/promotionService';

class PromotionController {
    async createPromotion(req: Request, res: Response) {
        try {
            const { title, description, startDate, endDate } = req.body;
            const promotion = await PromotionService.createPromotion(title, description, new Date(startDate), new Date(endDate));
            res.status(201).json(promotion);
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async addProductToPromotion(req: Request, res: Response) {
        try {
            const { promotionId, productId } = req.params;
            await PromotionService.addProductToPromotion(Number(promotionId), Number(productId));
            res.status(200).json({ message: 'Product added to promotion successfully' });
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async removeProductFromPromotion(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            await PromotionService.removeProductFromPromotion(Number(productId));
            res.status(200).json({ message: 'Product removed from promotion successfully' });
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async getProductsByPromotion(req: Request, res: Response) {
        try {
            const { promotionId } = req.params;
            const products = await PromotionService.getProductsByPromotion(Number(promotionId));
            res.status(200).json(products);
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async getPromotionById(req: Request, res: Response) {
        try {
            const { promotionId } = req.params;
            const promotion = await PromotionService.getPromotionById(Number(promotionId));
            if (!promotion) {
                return res.status(404).json({ message: 'Promotion not found' });
            }
            res.status(200).json(promotion);
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }
}

export default PromotionController;
