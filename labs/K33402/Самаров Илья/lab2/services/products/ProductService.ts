import Product, {
  ProductAttributes,
  ProductCreationAttributes,
} from "../../models/products/Product";
import { Op } from "sequelize";
class ProductService {
  async create(userData: ProductCreationAttributes): Promise<Product> {
    try {
      const product = await Product.create(userData);
      return product;
    } catch (error) {
      throw error;
    }
  }
  async getAll(): Promise<Product[]> {
    try {
      const product = await Product.findAll();
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(
    product: ProductAttributes,
    productData: Pick<ProductAttributes, "price" | "name" | "count">
  ): Promise<Product> {
    try {
      const [updatedRowsCount, updatedProduct] = await Product.update(
        {
          name: productData.name,
          price: productData.price,
          count: productData.count,
        },
        {
          where: { id: product.id },
          returning: true,
        }
      );

      if (updatedRowsCount === 0) {
        throw new Error("User not found");
      }
      return updatedProduct[0];
    } catch (error) {
      throw error;
    }
  }

  async delete(product: ProductAttributes): Promise<number> {
    try {
      const deletedRowsCount = await Product.destroy({
        where: { id: product.id },
      });
      if (deletedRowsCount === 0) {
        throw new Error("Product not found");
      }
      return deletedRowsCount;
    } catch (error) {
      throw error;
    }
  }

  async findById(product: ProductAttributes): Promise<Product> {
    try {
      console.log(product.id);
      const findedProduct = await Product.findByPk(Number(product.id));
      if (findedProduct === null) {
        throw new Error("Product not found");
      }
      return findedProduct;
    } catch (error) {
      throw error;
    }
  }

  async findByName(product: ProductAttributes): Promise<Product[]> {
    try {
      const findedProducts = await Product.findAll({
        where: { name: { [Op.like]: `%${product.name}%` } },
      });
      return findedProducts;
    } catch (error) {
      throw error;
    }
  }

  async findSales(product: ProductAttributes): Promise<Product[]> {
    try {
      const findedProducts = await Product.findAll({
        where: { sale: { [Op.gt]: "0" } },
      });
      return findedProducts;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
