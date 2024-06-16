import { Promotion } from "../../models/promotions/Promotion";
import { Product } from "../../models/products/Product";

class PromotionService {
    async createPromotion(title: string, description: string, startDate: Date, endDate: Date): Promise<Promotion> {
        const promotion = await Promotion.create({
            title,
            description,
            startDate,
            endDate,
        });
        return promotion;
    }

    async addProductToPromotion(promotionId: number, productId: number): Promise<void> {
        const promotion = await Promotion.findByPk(promotionId);
        if (!promotion) {
            throw new Error('Promotion not found');
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        await product.update({ promotionId });
    }

    async removeProductFromPromotion(productId: number): Promise<void> {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        await product.update({ promotionId: null });
    }

    async getProductsByPromotion(promotionId: number): Promise<Product[]> {
        const promotion = await Promotion.findByPk(promotionId, {
            include: [Product],
        });
        if (!promotion) {
            throw new Error('Promotion not found');
        }

        return promotion.products;
    }

    async getPromotionById(promotionId: number): Promise<Promotion | null> {
        const promotion = await Promotion.findByPk(promotionId);
        return promotion;
    }
}

export default new PromotionService();
