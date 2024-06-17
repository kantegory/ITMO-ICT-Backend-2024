import {getRepository} from 'typeorm';
import {Product} from '../entities/Product';
import {Warehouse} from '../entities/Warehouse';

class ProductService {
    static async createProduct(name: string, price: number, quantity: number, warehouseId: number) {
        const productRepository = getRepository(Product);
        const warehouseRepository = getRepository(Warehouse);
        const warehouse = await warehouseRepository.findOne({where: {id: warehouseId}});

        if (!warehouse) {
            throw new Error('Warehouse not found');
        }

        const product = productRepository.create({name, price, quantity, warehouse});
        await productRepository.save(product);
        return product;
    }

    static async updateProduct(id: number, updateFields: Partial<Product>) {
        const productRepository = getRepository(Product);
        await productRepository.update(id, updateFields);
        return productRepository.findOne({where: {id}});
    }

    static async deleteProduct(id: number) {
        const productRepository = getRepository(Product);
        await productRepository.delete(id);
    }

    static async getProductQuantity(id: number) {
        const productRepository = getRepository(Product);
        const product = await productRepository.findOne({where: {id}});
        return product?.quantity;
    }

    static async applyDiscount(id: number, discount: number) {
        const productRepository = getRepository(Product);
        await productRepository.update(id, {discount});
        return productRepository.findOne({where: {id}});
    }
}

export default ProductService;
