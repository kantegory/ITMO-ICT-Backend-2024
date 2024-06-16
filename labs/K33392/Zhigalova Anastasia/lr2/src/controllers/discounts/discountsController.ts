import { Request, Response } from 'express';
import { DiscountService } from '../../services/discounts/discountService';


export class DiscountController {
    private discountService: DiscountService;

    constructor() {
        this.discountService = new DiscountService();
    }

    async createDiscount(req: Request, res: Response) {
        try {
            const discountData = req.body;
            const discount = await this.discountService.createDiscount(discountData);
            res.status(201).json(discount);
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async getDiscountById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const discount = await this.discountService.getDiscountById(Number(id));
            if (discount) {
                res.status(200).json(discount);
            } else {
                res.status(404).json({ message: 'Discount not found' });
            }
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async getAllDiscounts(req: Request, res: Response) {
        try {
            const discounts = await this.discountService.getAllDiscounts();
            res.status(200).json(discounts);
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async updateDiscount(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const discountData = req.body;
            const updatedDiscount = await this.discountService.updateDiscount(Number(id), discountData);
            if (updatedDiscount) {
                res.status(200).json(updatedDiscount);
            } else {
                res.status(404).json({ message: 'Discount not found' });
            }
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async deleteDiscount(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const success = await this.discountService.deleteDiscount(Number(id));
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Discount not found' });
            }
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async addProductToDiscount(req: Request, res: Response) {
        try {
            const { discountId, productId } = req.body;
            await this.discountService.addProductToDiscount(discountId, productId);
            res.status(200).json({ message: 'Product added to discount successfully' });
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async removeProductFromDiscount(req: Request, res: Response) {
        try {
            const { productId } = req.body;
            await this.discountService.removeProductFromDiscount(productId);
            res.status(200).json({ message: 'Product removed from discount successfully' });
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }
}