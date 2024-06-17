import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {Item} from '../entities/Item';

class ItemController {
    static async addItem(req: Request, res: Response) {
        try {
            const itemRepository = getRepository(Item);
            const newItem = itemRepository.create(req.body);
            await itemRepository.save(newItem);
            res.status(201).json(newItem);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async modifyItem(req: Request, res: Response) {
        try {
            const itemRepository = getRepository(Item);
            await itemRepository.update(req.params.id, req.body);
            const updatedItem = await itemRepository.findOne({where: {id: Number(req.params.id)}});
            res.status(200).json(updatedItem);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async removeItem(req: Request, res: Response) {
        try {
            const itemRepository = getRepository(Item);
            await itemRepository.delete(req.params.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async getItemStock(req: Request, res: Response) {
        try {
            const itemRepository = getRepository(Item);
            const item = await itemRepository.findOne({where: {id: Number(req.params.id)}});
            res.status(200).json({stock: item?.stock});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async applyOffer(req: Request, res: Response) {
        try {
            const itemRepository = getRepository(Item);
            await itemRepository.update(req.params.id, {discount: req.body.discount});
            const updatedItem = await itemRepository.findOne({where: {id: Number(req.params.id)}});
            res.status(200).json(updatedItem);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}

export default ItemController;