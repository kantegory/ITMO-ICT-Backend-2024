import { Product } from '../../models/products/Product';
import { Discount } from '../../models/discounts/Discount';

export class DiscountService {
    async createDiscount(discountData: any): Promise<Discount> {
      const discount = await Discount.create(discountData);
      return discount;
    }
  
    async getDiscountById(discountId: number): Promise<Discount | null> {
      const discount = await Discount.findByPk(discountId, {
        include: [Product]
      });
      return discount;
    }
  
    async getAllDiscounts(): Promise<Discount[]> {
      const discounts = await Discount.findAll({
        include: [Product]
      });
      return discounts;
    }
  
    async updateDiscount(discountId: number, discountData: any): Promise<Discount | null> {
      const discount = await Discount.findByPk(discountId);
      if (discount) {
        await discount.update(discountData);
      }
      return discount;
    }
  
    async deleteDiscount(discountId: number): Promise<boolean> {
      const deleted = await Discount.destroy({
        where: { id: discountId }
      });
      return deleted > 0;
    }
  
    async addProductToDiscount(discountId: number, productId: number): Promise<void> {
      const product = await Product.findByPk(productId);
      if (product) {
        await product.update({ discountId: discountId });
      }
    }
  
    async removeProductFromDiscount(productId: number): Promise<void> {
      const product = await Product.findByPk(productId);
      if (product) {
        await product.update({ discountId: null });
      }
    }
  }