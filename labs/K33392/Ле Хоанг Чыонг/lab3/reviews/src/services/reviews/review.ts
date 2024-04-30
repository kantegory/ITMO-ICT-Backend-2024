import { Review } from '../../models/reviews/review';
import axios from 'axios';

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
            // Find the review to be updated
            const review = await Review.findByPk(id);
            if (!review) {
                throw new Error('Review not found');
            }

            // Get the location ID before updating the review
            const locationIdBeforeUpdate = review.location_id;

            // Update the review
            const [, updatedRowsCount]: [any, any] = await Review.update(reviewData, {
                where: { id, user_id: reviewData.user_id },
                returning: true,
            });

            // Check if the review was updated
            if (updatedRowsCount === 0) {
                throw new Error('Review not found');
            }

            // Find all reviews associated with the location
            const reviews = await Review.findAll({ where: { location_id: locationIdBeforeUpdate } });

            // Calculate the new total rating for the location
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

            // Calculate the new average rating for the location
            const averageRating = totalRating / reviews.length;

            // Round the average rating
            const roundedRating = Math.round(averageRating);

            // Update the location's rating
            await axios.put(`http://localhost:8000/locations/v1/update-location`, {
                id: locationIdBeforeUpdate,
                rating: roundedRating,
            });

            // Return the updated review
            return review;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<number> {
        try {
            const review = await Review.findByPk(id);
            if (!review) {
                throw new Error('Review not found');
            }

            // Get location ID before deleting the review
            const locationId = review.location_id;

            // Delete the review
            const deletedRowsCount = await Review.destroy({
                where: { id },
            });

            // Recalculate and update location rating
            const reviews = await Review.findAll({ where: { location_id: locationId } });
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            const roundedRating = Math.round(averageRating);

            // Update location rating
            await axios.put(`http://localhost:8000/locations/v1/update-location`, {
                id: locationId,
                rating: roundedRating,
            });

            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }

}

export default ReviewService;
