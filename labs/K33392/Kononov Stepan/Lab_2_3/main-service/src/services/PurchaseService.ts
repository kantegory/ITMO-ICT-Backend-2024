import {getRepository} from 'typeorm';
import {Product} from '../entities/Product';
import {Purchase} from '../entities/Purchase';

class PurchaseService {
    static async purchaseProduct(userId: number, productId: number, quantity: number) {
        const productRepository = getRepository(Product);
        const product = await productRepository.findOne({where: {id: productId}});
        if (!product || product.quantity < quantity) {
            throw new Error('Not enough product in stock');
        }

        product.quantity -= quantity;
        await productRepository.save(product);

        const purchaseRepository = getRepository(Purchase);
        const purchase = purchaseRepository.create({
            userId,
            product,
            quantity,
            date: new Date()
        });
        await purchaseRepository.save(purchase);
        return purchase;
    }

    static async getPurchaseHistory(userId: number) {
        const purchaseRepository = getRepository(Purchase);
        return await purchaseRepository.find({where: {userId}, relations: ['product']});
    }
}

export default PurchaseService;