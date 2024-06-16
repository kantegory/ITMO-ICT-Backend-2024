import { Product } from '../../models/products/Product';
import { Order } from '../../models/orders/Order';
import Sequelize from 'sequelize';


export class ProductService {
  
  async createProduct(productData: any): Promise<Product> {
    const product = await Product.create(productData);
    return product;
  }

  async getProductById(productId: number): Promise<Product | null> {
    const product = await Product.findByPk(productId, {
      include: [Order]
    });
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await Product.findAll({
      include: [Order]
    });
    return products;
  }

  async updateProduct(productId: number, productData: any): Promise<Product | null> {
    const product = await Product.findByPk(productId);
    if (product) {
      await product.update(productData);
    }
    return product;
  }

  async deleteProduct(productId: number): Promise<boolean> {
    const deleted = await Product.destroy({
      where: { id: productId }
    });
    return deleted > 0;
  }

  async getOrdersByProductId(productId: number): Promise<Order[] | null> {
    const product = await Product.findByPk(productId, {
      include: [Order]
    });
    if (product && product.orders) {
      return product.orders;
    } else {
      return null;
    }
  }
}