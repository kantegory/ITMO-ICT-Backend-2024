import { Unicorn } from "../models/unicorns.js";

export class UnicornService {
  async getAll(): Promise<Unicorn[]> {
    try {
      return await Unicorn.findAll();
    } catch {
      throw new Error("failed to get unicorns");
    }
  }

  async create(data: any): Promise<Unicorn> {
    try {
      return (await Unicorn.create(data)).toJSON();
    } catch {
      throw new Error("failed to create unicorn");
    }
  }

  async update(id: number, newData: Partial<Unicorn>): Promise<Unicorn> {
    try {
      const unicornToUpdate = await Unicorn.findByPk(id);
      if (!unicornToUpdate) throw new Error(`Unicorn with id ${id} not found`);

      await unicornToUpdate.update(newData);
      return unicornToUpdate;
    } catch {
      throw new Error(`failed to update unicorn with id ${id}`);
    }
  }
}
