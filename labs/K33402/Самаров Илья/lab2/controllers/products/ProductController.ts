import ProductService from "../../services/products/ProductService";
import { ProductAttributes } from "../../models/products/Product";
import { error } from "console";

export default class UserController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }
  create = async (request: any, response: any) => {
    const { body } = request;
    console.log(body);
    try {
      const data: ProductAttributes | Error = await this.productService.create(
        body
      );
      response.status(201).send(data);
    } catch (error: any) {
      response.status(400).send({ error: error.toString() });
    }
  };
  get = async (request: any, response: any) => {
    try {
      const product = await this.productService.getAll();
      response.status(201).send(product);
    } catch (error: any) {
      response.status(404).send({ error: error.toString() });
    }
  };

  update = async (request: any, response: any) => {
    try {
      const product = await this.productService.update(
        request.body,
        request.body
      );
      response.status(201).send(product);
    } catch (error: any) {
      response.status(400).send({ error: error.toString() });
    }
  };

  delete = async (request: any, response: any) => {
    try {
      const { body } = request;
      await this.productService.delete(body);
      response.status(201).send({ error: "Product have successful deleted" });
    } catch (error: any) {
      response.status(400).send({ error: error.toString() });
    }
  };

  findById = async (request: any, response: any) => {
    try {
      const { body } = request;
      const product = await this.productService.findById(body);
      response.status(201).send(product);
    } catch (error: any) {
      response.status(404).send({ error: error.toString() });
    }
  };

  findByName = async (request: any, response: any) => {
    try {
      const { body } = request;
      const product = await this.productService.findByName(body);
      response.status(201).send(product);
    } catch (error: any) {
      response.status(404).send({ error: error.toString() });
    }
  };

  findSales = async (request: any, response: any) => {
    try {
      const { body } = request;
      const product = await this.productService.findSales(body);
      response.status(201).send(product);
    } catch (error: any) {
      response.status(404).send({ error: error.toString() });
    }
  };
}
