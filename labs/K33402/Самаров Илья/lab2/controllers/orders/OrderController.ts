import OrderService from "../../services/orders/OrderService";
import { OrderAttributes } from "../../models/orders/Order";
import { error } from "console";

export default class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }
  create = async (request: any, response: any) => {
    const { body } = request;
    try {
      const data: OrderAttributes | Error = await this.orderService.create(
        body
      );
      response.status(201).send(data);
    } catch (error: any) {
      response.status(400).send({ error: error.toString() });
    }
  };
  get = async (request: any, response: any) => {
    try {
      const order = await this.orderService.getAll();
      response.status(201).send(order);
    } catch (error: any) {
      response.status(404).send({ error: error.toString() });
    }
  };

  //   update = async (request: any, response: any) => {
  //     try {
  //       const order = await this.orderService.update(
  //         request.body,
  //         request.body
  //       );
  //       response.status(201).send(order);
  //     } catch (error: any) {
  //       response.status(400).send({ error: error.toString() });
  //     }
  //   };

  delete = async (request: any, response: any) => {
    try {
      const { id } = request;
      await this.orderService.delete(id);
      response.status(201).send({ error: "Order have successful deleted" });
    } catch (error: any) {
      response.status(400).send({ error: error.toString() });
    }
  };
  findById = async (request: any, response: any) => {
    try {
      const { body } = request;
      const product = await this.orderService.findById(body);
      response.status(201).send(product);
    } catch (error: any) {
      response.status(404).send({ error: error.toString() });
    }
  };

  findByUser = async (request: any, response: any) => {
    try {
      const { body } = request;
      const product = await this.orderService.findByUser(body);
      response.status(201).send(product);
    } catch (error: any) {
      response.status(404).send({ error: error.toString() });
    }
  };

  findByProduct = async (request: any, response: any) => {
    try {
      const { body } = request;
      const product = await this.orderService.findByProduct(body);
      response.status(201).send(product);
    } catch (error: any) {
      response.status(404).send({ error: error.toString() });
    }
  };
}
