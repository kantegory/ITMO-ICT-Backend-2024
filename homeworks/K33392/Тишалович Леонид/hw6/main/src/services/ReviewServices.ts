import { Sequelize } from "sequelize-typescript";
import Review from "../models/Review";
import { Repository } from "sequelize-typescript";

export default class ReviewService {
  private reviewRepository: Repository<Review>;

  constructor(sequelizeInstance: Sequelize) {
    this.reviewRepository = sequelizeInstance.getRepository(Review);
  }

  async getAllReviews() {
    return this.reviewRepository.findAll();
  }

  async getReviewById(id: number) {
    return this.reviewRepository.findByPk(id);
  }

  async createReview(reviewData: any) {
    return this.reviewRepository.create(reviewData);
  }

  async updateReview(id: number, reviewData: any) {
    const review = await this.reviewRepository.findByPk(id);
    if (!review) {
      throw new Error("Review not found");
    }
    await review.update(reviewData);
    return review;
  }

  async deleteReview(id: number) {
    const review = await this.reviewRepository.findByPk(id);
    if (!review) {
      throw new Error("Review not found");
    }
    await review.destroy();
  }
}
