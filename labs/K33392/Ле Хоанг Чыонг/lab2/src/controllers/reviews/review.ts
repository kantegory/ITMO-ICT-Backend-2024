import ReviewService from '../../services/reviews/review'
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class ReviewController {
    private reviewService: ReviewService

    constructor() {
        this.reviewService = new ReviewService()
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request;
            console.log(body);
            const userId = request.user.id;
            const review: any = await this.reviewService.create({ ...body, user_id: userId });
            response.status(201).send(review)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const reviews: any = await this.reviewService.getAll()
            response.status(201).send(reviews)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }
    update = async (request: any, response: any) => {
        const { body } = request;
        const userId = request.user.id;
        const reviewId = request.params.review_id;

        try {
            const updatedReview: any = await this.reviewService.update(reviewId, { ...body, user_id: userId })
            response.status(201).send(updatedReview)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
    
    getById = async (request: any, response: any) => {
        try {
            const reviewId = request.params.id;
            const review: any = await this.reviewService.getById(reviewId);
            response.status(201).send(review)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const reviewId = request.params.id;
            const deletedReview: any = await this.reviewService.delete(reviewId)
            
            response.status(201).send('Review has been successfully deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
}