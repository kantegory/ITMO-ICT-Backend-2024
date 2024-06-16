import {TourTransformer, transform} from '../transformers'
import ApiResponse from '../responses/apiResponse'
import BaseController from "./baseController";
import express, {NextFunction} from 'express';
import Tour from "../models/tour";
import IndexMyRecommendationsUseCase from "../useCases/recomendations/indexMyRecommendationsUseCase";
import IndexRecommendationsByTourUseCase from "../useCases/recomendations/indexRecommendationsByTourUseCase";

class RecommendationsController extends BaseController {

    my = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            const tours: Tour[] = await IndexMyRecommendationsUseCase.run(request.user)
            ApiResponse.payload(response, transform(tours, new TourTransformer()))
        } catch (e: any) {
            next(e)
        }
    }

    indexByTour = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            const tours: Tour[] = await IndexRecommendationsByTourUseCase.run(Number(request.params.id))
            ApiResponse.payload(response, transform(tours, new TourTransformer()))
        } catch (e: any) {
            next(e)
        }
    }
}

export default RecommendationsController