import { transform } from 'shared-core'
import { ApiResponse } from 'shared-core'
import { BaseController } from "shared-core";
import express, {NextFunction} from 'express';
import { Tour } from "../../providers/sequelize";
import TourTransformer from "../transformers/tourTransformer";
import IndexMyRecommendationsUseCase, {IRecommendationFilters} from "../useCases/recomendations/indexMyRecommendationsUseCase";
import IndexRecommendationsByTourUseCase from "../useCases/recomendations/indexRecommendationsByTourUseCase";
import axios from "axios";
import appConfig from "../../config/app";

class RecommendationsController extends BaseController {

    my = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            const filters: IRecommendationFilters = await IndexMyRecommendationsUseCase.run(request.user)

            const toursResponse = await axios.get(appConfig.TOURS_SERVICE_URL + `/tours`, {
                params: filters,
                headers: {
                    'Cookie': `jwt_access=${request.cookies.jwt_access}`
                }
            })
            const tours: Tour[] = toursResponse.data

            ApiResponse.payload(response, transform(tours, new TourTransformer()))
        } catch (e: any) {
            next(e)
        }
    }

    indexByTour = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            const tourResponse = await axios.get(appConfig.TOURS_SERVICE_URL + `/tours/${request.params.id}`, {
                headers: {
                    'Cookie': `jwt_access=${request.cookies.jwt_access}`
                }
            })
            const tour: Tour = tourResponse.data
            const filters = await IndexRecommendationsByTourUseCase.run(tour)

            const toursResponse = await axios.get(appConfig.TOURS_SERVICE_URL + `/tours`, {
                params: filters,
                headers: {
                    'Cookie': `jwt_access=${request.cookies.jwt_access}`
                }
            })
            const tours: Tour[] = toursResponse.data

            ApiResponse.payload(response, transform(tours, new TourTransformer()))
        } catch (e: any) {
            next(e)
        }
    }
}

export default RecommendationsController