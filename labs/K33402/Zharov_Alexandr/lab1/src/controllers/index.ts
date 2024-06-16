import { Request, Response } from "express";
import { Unicorn } from "../models/unicorns";
import { UnicornService } from "../services";

export class UnicornController {
  service: UnicornService;

  constructor() {
    this.service = new UnicornService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const unicorns = await this.service.getAll();
      res.send(unicorns);
    } catch {
      res.status(404).send({ error: "unicorns not found" });
    }
  };

  post = async (req: Request, res: Response) => {
    try {
      res.send(await this.service.create(req.body as Unicorn));
    } catch {
      res.status(400).send({ error: "invalid data specified" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updatedUnicorn = await this.service.update(id, req.body as Unicorn);
      res.send(updatedUnicorn);
    } catch {
      res.status(400).send({ error: "failed to update unicorn" });
    }
  };
}
