import { Order } from "../../models/orders/Order";
import { Product } from "../../models/products/Product";

export class OrderService {
  async createOrder(
    userId: number,
    productId: number,
    quantity: number
  ): Promise<Order | null> {
    try {
      const product = await Product.findByPk(productId);
      if (!product || product.stockQuantity < quantity) {
        console.error("Product is not available in sufficient quantity.");
        return null;
      }

      const orderDate = new Date();
      const order = await Order.create({
        userId,
        productId,
        quantity,
        orderDate,
      });

      await Product.update(
        { stockQuantity: product.stockQuantity - quantity },
        { where: { id: productId } }
      );

      return order;
    } catch (error) {
      console.error("An error occurred while creating the order:", error);
      return null;
    }
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    try {
      const order = await Order.findByPk(orderId, { include: [Product] });
      return order;
    } catch (error) {
      console.error("An error occurred while retrieving the order:", error);
      return null;
    }
  }

  async updateOrderQuantity(
    orderId: number,
    newQuantity: number
  ): Promise<Order | null> {
    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        console.error("Order not found.");
        return null;
      }

      const product = await Product.findByPk(order.productId);
      if (!product || product.stockQuantity + order.quantity < newQuantity) {
        console.error(
          "Product is not available in sufficient quantity for update."
        );
        return null;
      }

      const updatedStockQuantity =
        product.stockQuantity + order.quantity - newQuantity;
      await Product.update(
        { stockQuantity: updatedStockQuantity },
        { where: { id: order.productId } }
      );

      await order.update({ quantity: newQuantity });

      return order;
    } catch (error) {
      console.error("An error occurred while updating the order:", error);
      return null;
    }
  }

  async deleteOrder(orderId: number): Promise<boolean> {
    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        console.error("Order not found.");
        return false;
      }

      const product = await Product.findByPk(order.productId);
      if (product) {
        await Product.update(
          { stockQuantity: product.stockQuantity + order.quantity },
          { where: { id: order.productId } }
        );
      }

      await Order.destroy({ where: { id: orderId } });

      return true;
    } catch (error) {
      console.error("An error occurred while deleting the order:", error);
      return false;
    }
  }

  async findOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      return await Order.findAll({ where: { userId: userId } });
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  }
}
