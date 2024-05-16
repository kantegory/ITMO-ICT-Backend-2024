import { Request, Response } from "express";

import { Order } from "../../models/orders/Order";
import { OrderService } from "../../services/orders/orderService";

export class OrdersController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(req: Request, res: Response) {
    try {
      const { userId, productId, quantity } = req.body;
      const order = await this.orderService.createOrder(
        userId,
        productId,
        quantity
      );
      if (order) {
        res.status(201).json(order);
      } else {
        res.status(400).json({
          message:
            "Unable to create order. Product may be out of stock or not found.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const order = await this.orderService.getOrderById(Number(orderId));
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async updateOrderQuantity(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { newQuantity } = req.body;
      const updatedOrder = await this.orderService.updateOrderQuantity(
        Number(orderId),
        newQuantity
      );
      if (updatedOrder) {
        res.status(200).json(updatedOrder);
      } else {
        res.status(400).json({
          message:
            "Unable to update order. Product may be out of stock or not found.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const success = await this.orderService.deleteOrder(Number(orderId));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async findOrdersByUserId(req: Request, res: Response): Promise<void> {
    try {
      res.json(await this.orderService.findOrdersByUserId(req.params.userId));
    } catch (error) {
      console.error("Error fetching user orders:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
