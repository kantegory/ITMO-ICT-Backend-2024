import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {Rating} from '../entities/Rating';
import {Item} from '../entities/Item';

class RatingController {
    static async addRating(req: Request, res: Response) {
        try {
            const ratingRepository = getRepository(Rating);
            const itemRepository = getRepository(Item);
            const {itemId, rating, comment} = req.body;

            const item = await itemRepository.findOne({where: {id: itemId}});
            if (!item) {
                throw new Error('Item not found');
            }

            const newRating = ratingRepository.create({
                userId: req.body.userId,
                item,
                rating,
                comment
            });
            await ratingRepository.save(newRating);
            res.status(201).json(newRating);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async getRatings(req: Request, res: Response) {
        try {
            const ratingRepository = getRepository(Rating);
            const itemId = Number(req.params.itemId);
            const ratings = await ratingRepository.find({where: {item: {id: itemId}}, relations: ['item']});
            res.status(200).json(ratings);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async updateRating(req: Request, res: Response) {
        try {
            const ratingRepository = getRepository(Rating);
            const itemId = Number(req.params.itemId);
            const userId = req.body.userId;
            const {rating, comment} = req.body;

            const existingRating = await ratingRepository.findOne({where: {item: {id: itemId}, userId}});
            if (!existingRating) {
                throw new Error('Rating not found');
            }

            existingRating.rating = rating;
            existingRating.comment = comment;
            await ratingRepository.save(existingRating);
            res.status(200).json(existingRating);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    static async deleteRating(req: Request, res: Response) {
        try {
            const ratingRepository = getRepository(Rating);
            const { itemId } = req.params;
            const userId = req.body.user.userId;

            const rating = await ratingRepository.findOne({ where: { item: { id: Number(itemId) }, userId } });
            if (!rating) {
                return res.status(404).json({ message: 'Rating not found' });
            }

            await ratingRepository.delete(rating.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

}

export default RatingController;
