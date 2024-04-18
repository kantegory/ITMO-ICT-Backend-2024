import { Sequelize } from "sequelize-typescript";
import Review from "../models/Review";
import { Repository } from "sequelize-typescript";

export default class ReviewService {
  private static reviewRepository: Repository<Review>;

  static initialize(sequelizeInstance: Sequelize): void {
    ReviewService.reviewRepository = sequelizeInstance.getRepository(Review);
  }
  static async getAllReviews() {
    return this.reviewRepository.findAll();
  }

  static async getReviewById(id: number) {
    return this.reviewRepository.findByPk(id);
  }

  static async createReview(reviewData: any) {
    return this.reviewRepository.create(reviewData);
  }

  static async updateReview(id: number, reviewData: any) {
    const review = await this.reviewRepository.findByPk(id);
    if (!review) {
      throw new Error("Review not found");
    }
    await review.update(reviewData);
    return review;
  }

  static async deleteReview(id: number) {
    const review = await this.reviewRepository.findByPk(id);
    if (!review) {
      throw new Error("Review not found");
    }
    await review.destroy();
  }
}
