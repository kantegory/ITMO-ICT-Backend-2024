import Tour from "../../models/tour";
import {sequelize} from "../../providers/sequelize";
import {NotFoundError} from "../../errors";
import ComfortLevel from "../../models/dictionaries/comfortLevel";
import DifficultyLevel from "../../models/dictionaries/difficultyLevel";
import Place from "../../models/dictionaries/place";
import TourActivity from "../../models/dictionaries/tourActivity";
import TourType from "../../models/dictionaries/tourType";
import IndexTourUseCase, {IIndexTourFilters} from "../tours/indexTourUseCase";


class IndexRecommendationsByTourUseCase {
    static async run(tourId: number): Promise<Tour[]> {
        //@ts-ignore
        const tour = await Tour.findByPk(tourId, {
            include: [
                'tourActivities',
                'tourTypes',
            ]
        })
        if (!tour) {
            throw new NotFoundError('Tour not found')
        }

        const priceDeltaPercent = 20
        let filters: IIndexTourFilters = {
            canGoWithChildren: null,
            minPrice: tour.price * (1 - priceDeltaPercent / 100),
            maxPrice: tour.price * (1 + priceDeltaPercent / 100),
            minPeople: null,
            maxPeople: null,
            name: null,
            placeIds: [],
            comfortLevelIds: [tour.comfortLevelId],
            difficultyLevelIds: [tour.difficultyLevelId],
            tourActivityIds: tour.tourActivities.map(el => el.id),
            tourTypeIds: tour.tourTypes.map(el => el.id)
        }

        return await IndexTourUseCase.run(filters)
    }
}

export default IndexRecommendationsByTourUseCase