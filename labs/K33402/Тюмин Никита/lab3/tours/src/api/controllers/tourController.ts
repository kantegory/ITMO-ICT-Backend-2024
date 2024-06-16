import { transform } from 'shared-core'
import TourTransformer from '../transformers/tourTransformer'
import { ApiResponse } from 'shared-core'
import { BaseController } from "shared-core";
import express, {NextFunction} from 'express';
import { Tour } from "@providers/sequelize";
import IndexTourUseCase, {IIndexTourFilters} from "../useCases/tours/indexTourUseCase";
import FindTourUseCase from "../useCases/tours/findTourUseCase";
import StoreTourUseCase from "../useCases/tours/storeTourUseCase";
import UpdateTourUseCase from "../useCases/tours/updateTourUseCase";
import DestroyTourUseCase from "../useCases/tours/destroyTourUseCase";
import { body } from "express-validator";

class TourController extends BaseController {

    index = async (request: express.Request, response: express.Response) => {
        const filters: IIndexTourFilters = {
            name: request.query.name as string ?? null,
            minPrice: request.query.minPrice ? parseInt(request.query.minPrice as string) : null,
            maxPrice: request.query.maxPrice ? parseInt(request.query.maxPrice as string) : null,
            canGoWithChildren: ['true', 'false'].includes(request.query.canGoWithChildren as string) ? (request.query.canGoWithChildren === 'true') : null,
            minPeople: request.query.minPeople ? parseInt(request.query.minPeople as string) : null,
            maxPeople: request.query.maxPeople ? parseInt(request.query.maxPeople as string) : null,

            comfortLevelIds: request.query.comfortLevelIds ? (request.query.comfortLevelIds as string[]).map(el => parseInt(el)) : [],
            difficultyLevelIds: request.query.difficultyLevelIds ? (request.query.difficultyLevelIds as string[]).map(el => parseInt(el)) : [],
            placeIds: request.query.placeIds ? (request.query.placeIds as string[]).map(el => parseInt(el)) : [],
            tourActivityIds: request.query.tourActivitiyIds ? (request.query.tourActivitiyIds as string[]).map(el => parseInt(el)) : [],
            tourTypeIds: request.query.tourTypeIds ? (request.query.tourTypeIds as string[]).map(el => parseInt(el)) : [],
        }

        const tours: Array<Tour> = await IndexTourUseCase.run(filters)
        ApiResponse.payload(response, transform(tours, new TourTransformer()))
    }

    find = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            const tour: Tour = await FindTourUseCase.run(Number(request.params.id))
            ApiResponse.payload(response, transform(tour, new TourTransformer()))
        } catch (e: any) {
            next(e)
        }
    }

    store = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            await this.validate(request, [
                body('name').notEmpty().isString(),
                body('price').notEmpty().isInt(),
                body('canGoWithChildren').notEmpty().isBoolean(),
                body('maxPeople').notEmpty().isInt(),
                body('comfortLevelId').notEmpty().isInt(),
                body('difficultyLevelId').notEmpty().isInt(),
                body('placeId').notEmpty().isInt(),
                body('tourActivities').notEmpty().isArray(),
                body('tourTypes').notEmpty().isArray(),
            ])
            const tour: Tour = await StoreTourUseCase.run(request.body)
            ApiResponse.payload(response, transform(tour, new TourTransformer()))
        } catch (e: any) {
            next(e)
        }
    }

    update = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            await this.validate(request, [
                body('name').notEmpty().isString(),
                body('price').notEmpty().isInt(),
                body('canGoWithChildren').notEmpty().isBoolean(),
                body('maxPeople').notEmpty().isInt(),
                body('comfortLevelId').notEmpty().isInt(),
                body('difficultyLevelId').notEmpty().isInt(),
                body('placeId').notEmpty().isInt(),
                body('tourActivities').notEmpty().isArray(),
                body('tourTypes').notEmpty().isArray(),
            ])
            const tour = await UpdateTourUseCase.run(Number(request.params.id), request.body)
            ApiResponse.payload(response, transform(tour, new TourTransformer()))
        } catch (e: any) {
            next(e)
        }
    }

    destroy = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            await DestroyTourUseCase.run(Number(request.params.id))
            ApiResponse.success(response)
        } catch (e: any) {
            next(e)
        }
    }
}

export default TourController