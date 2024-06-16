import { PrismaClient } from '@prisma/client'
import { Product } from '@prisma/client'

const prisma = new PrismaClient()

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany()
  }

  async getProductById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } })
  }

  async createProduct(
    name: string,
    description: string,
    price: number
  ): Promise<Product> {
    return prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    })
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
    })
  }

  async deleteProduct(id: number): Promise<Product> {
    return prisma.product.delete({
      where: { id },
    })
  }
}

export default new ProductService()
