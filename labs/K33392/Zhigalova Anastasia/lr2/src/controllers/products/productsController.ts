import { Request, Response } from 'express';
import { ProductService } from '../../services/products/productService';



class ProductsController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async createProduct(req: Request, res: Response) {
        try {
            const productData = req.body;
            const product = await this.productService.createProduct(productData);
            res.status(201).json(product);
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
            
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const  productId  = req.params.productId; 
            const product = await this.productService.getProductById(Number(productId));
            if (product) {
                res.status(200).json(product);
            } 
            
            else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            console.log(this.productService);
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ error: error });
            }
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const productData = req.body;
            const updatedProduct = await this.productService.updateProduct(Number(productId), productData);
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const success = await this.productService.deleteProduct(Number(productId));
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async getOrdersByProductId(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const orders = await this.productService.getOrdersByProductId(Number(productId));
            if (orders) {
                res.status(200).json(orders);
            } else {
                res.status(404).json({ message: 'Orders for the product not found' });
            }
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    async getProductStockQuantity(req: Request, res: Response) {
        try {
            const { productId } = req.params; 
            const product = await this.productService.getProductById(Number(productId)); 
            
            if (product) {
                res.status(200).json({ stockQuantity: product.stockQuantity });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            if ( error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }
    




}



export default ProductsController;