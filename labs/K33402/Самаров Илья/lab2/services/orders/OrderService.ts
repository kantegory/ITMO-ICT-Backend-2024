import Order, {
  OrderAttributes,
  OrderCreationAttributes,
} from "../../models/orders/Order";

class OrderService {
  async create(userData: OrderCreationAttributes): Promise<Order> {
    try {
      const order = await Order.create(userData);
      return order;
    } catch (error) {
      throw error;
    }
  }
  async getAll(): Promise<Order[]> {
    try {
      const order = await Order.findAll();
      return order;
    } catch (error) {
      throw error;
    }
  }

  async delete(order: OrderAttributes): Promise<number> {
    try {
      const deletedRowsCount = await Order.destroy({
        where: { id: order.id },
      });
      if (deletedRowsCount === 0) {
        throw new Error("Product not found");
      }
      return deletedRowsCount;
    } catch (error) {
      throw error;
    }
  }

  async findById(order: OrderAttributes): Promise<Order> {
    try {
      console.log(order.id);
      const findedOrder = await Order.findByPk(Number(order.id));
      if (findedOrder === null) {
        throw new Error("Product not found");
      }
      return findedOrder;
    } catch (error) {
      throw error;
    }
  }

  async findByUser(order: OrderAttributes): Promise<Order[]> {
    try {
      const findedOrder = await Order.findAll({
        where: { userId: order.userId },
      });
      return findedOrder;
    } catch (error) {
      throw error;
    }
  }

  async findByProduct(order: OrderAttributes): Promise<Order[]> {
    try {
      const findedOrder = await Order.findAll({
        where: { productId: order.productId },
      });
      return findedOrder;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderService;
