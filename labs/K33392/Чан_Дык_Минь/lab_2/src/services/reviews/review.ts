import { Review } from '../../models/reviews/review';

class ReviewService {

    async create(reviewData: any): Promise<Review> {
        try {
            const review = await Review.create(reviewData);
            return review;
        } catch (error) {
            throw new Error('Each user can only review 1 time');
        }
    }

    async getById(id: string): Promise<Review> {
        try {
            const review = await Review.findByPk(id);
            if (!review) 
                throw new Error('Review not found');
            return review;
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<Review[]> {
        try {
            const reviews = await Review.findAll();
            return reviews;
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, reviewData: any): Promise<Review> {
        try {
            const [, updatedRowsCount]: [any, any] = await Review.update(reviewData, {
                where: { id, user_id : reviewData.user_id},
                returning: true,
            });
            // console.log(updatedRowsCount)
            if (updatedRowsCount === 0) {
                throw new Error('Review not found');
            }
            const updatedReview = await Review.findOne({ where: { id } });
            if (!updatedReview) {
                throw new Error('Updated trip not found');
            }
            return updatedReview; 

        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<number> {
        try {
            const deletedRowsCount = await Review.destroy({
                where: { id },
            });
            if (deletedRowsCount === 0) {
                throw new Error('Review not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }

}

export default ReviewService;
