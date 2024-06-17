import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {Warehouse} from '../entities/Warehouse';

class WarehouseController {
    static async createWarehouse(req: Request, res: Response) {
        try {
            const {name, location} = req.body;
            const warehouseRepository = getRepository(Warehouse);
            const warehouse = warehouseRepository.create({name, location});
            await warehouseRepository.save(warehouse);
            res.status(201).json(warehouse);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async getWarehouses(req: Request, res: Response) {
        try {
            const warehouseRepository = getRepository(Warehouse);
            const warehouses = await warehouseRepository.find();
            res.status(200).json(warehouses);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}

export default WarehouseController;
