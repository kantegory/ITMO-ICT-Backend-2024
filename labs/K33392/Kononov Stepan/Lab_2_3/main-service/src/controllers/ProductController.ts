import {Request, Response} from 'express';
import ProductService from '../services/ProductService';

class ProductController {
    static async createProduct(req: Request, res: Response) {
        try {
            const {name, price, quantity, warehouseId} = req.body;
            const product = await ProductService.createProduct(name, price, quantity, warehouseId);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async updateProduct(req: Request, res: Response) {
        try {
            const product = await ProductService.updateProduct(Number(req.params.id), req.body);
            res.status(200).json(product);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        try {
            await ProductService.deleteProduct(Number(req.params.id));
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async getProductQuantity(req: Request, res: Response) {
        try {
            const quantity = await ProductService.getProductQuantity(Number(req.params.id));
            res.status(200).json({quantity});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async applyDiscount(req: Request, res: Response) {
        try {
            const product = await ProductService.applyDiscount(Number(req.params.id), req.body.discount);
            res.status(200).json(product);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}

export default ProductController;
