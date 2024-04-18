import { Request, Response } from "express";
import ReviewService from "../services/ReviewServices";

export default class ReviewController {
  static async getAllReviews(req: Request, res: Response) {
    try {
      const reviews = await ReviewService.getAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getReviewById(req: Request, res: Response) {
    try {
      const reviewId = parseInt(req.params.id, 10);
      const review = await ReviewService.getReviewById(reviewId);
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createReview(req: Request, res: Response) {
    try {
      const newReview = await ReviewService.createReview(req.body);
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateReview(req: Request, res: Response) {
    try {
      const reviewId = parseInt(req.params.id, 10);
      const updatedReview = await ReviewService.updateReview(
        reviewId,
        req.body
      );
      res.json(updatedReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteReview(req: Request, res: Response) {
    try {
      const reviewId = parseInt(req.params.id, 10);
      await ReviewService.deleteReview(reviewId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
