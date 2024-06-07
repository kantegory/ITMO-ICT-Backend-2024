import { FastifyRequest, FastifyReply } from 'fastify'
import productService from '../services/productService'
import { createProductSchema } from '../schemas/productSchema'
import { Product } from '@prisma/client'

class ProductController {
  async getAllProducts(req: FastifyRequest, reply: FastifyReply) {
    const products = await productService.getAllProducts()
    reply.send(products)
  }

  async getProductById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const product = await productService.getProductById(parseInt(id, 10))
    reply.send(product)
  }

  async createProduct(req: FastifyRequest, reply: FastifyReply) {
    const { name, description, price } = createProductSchema.parse(req.body)
    const newProduct = await productService.createProduct(
      name,
      description,
      price
    )
    reply.send(newProduct)
  }

  async updateProduct(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const data = req.body as Partial<Product>
    const updatedProduct = await productService.updateProduct(
      parseInt(id, 10),
      data
    )
    reply.send(updatedProduct)
  }

  async deleteProduct(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const deletedProduct = await productService.deleteProduct(parseInt(id, 10))
    reply.send(deletedProduct)
  }
}

export default new ProductController()
