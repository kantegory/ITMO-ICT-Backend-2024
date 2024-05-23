import { Tour } from "../../../providers/sequelize";
import { IRecommendationFilters } from './indexMyRecommendationsUseCase'

class IndexRecommendationsByTourUseCase {
    static async run(tour: Tour): Promise<IRecommendationFilters> {
        const priceDeltaPercent = 20

        return {
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
    }
}

export default IndexRecommendationsByTourUseCase