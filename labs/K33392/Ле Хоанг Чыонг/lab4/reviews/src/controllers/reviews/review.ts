import ReviewService from '../../services/reviews/review'
import { getErrorMessage } from '../../utils/getErrorMessage';
import Review from '../../models/reviews/review';
import { Request, Response } from 'express';

export default class ReviewController {
    private reviewService: ReviewService

    constructor() {
        this.reviewService = new ReviewService()
    }

    create = async (request: any, response: Response) => {
        try {
            const { body } = request;
            console.log(body);
            const userId = request.userId;
            const review: Review = await this.reviewService.create({ ...body, userId: userId });
            response.status(201).send(review)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAll = async (request: Request, response: Response) => {
        try {
            const reviews: Review[] = await this.reviewService.getAll()
            response.status(201).send(reviews)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }
    update = async (request: any, response: any) => {
        const { body } = request;
        const userId = request.userId;
        const reviewId = request.params.review_id;

        try {
            const updatedReview: Review = await this.reviewService.update(reviewId, { ...body, userId: userId })
            response.status(201).send(updatedReview)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
    
    getById = async (request: Request, response: Response) => {
        try {
            const { reviewId } = request.body;
            const review: Review = await this.reviewService.getById(reviewId);
            response.status(201).send(review)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    delete = async (request: Request, response: Response) => {
        try {
            const { id } = request.body;
            const deletedReview: number = await this.reviewService.delete(id)
            
            response.status(201).send('Review has been successfully deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
}