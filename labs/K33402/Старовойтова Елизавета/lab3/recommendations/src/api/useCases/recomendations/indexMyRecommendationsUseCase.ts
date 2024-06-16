import { User, Tour } from "../../../providers/sequelize";
import { errors } from "shared-core";


export interface IRecommendationFilters {
    name: string|null
    minPrice: number|null
    maxPrice: number|null
    canGoWithChildren: boolean|null
    minPeople: number|null
    maxPeople: number|null

    comfortLevelIds: number[]
    difficultyLevelIds: number[]
    placeIds: number[]

    tourActivityIds: number[]
    tourTypeIds: number[]
}


class IndexMyRecommendationsUseCase {
    static async run(user: User): Promise<IRecommendationFilters> {
        const profile = await user.$get('profile', {
            include: [
                'comfortLevels',
                'difficultyLevels',
                'places',
                'tourActivities',
                'tourTypes',
            ]
        })
        if (!profile) {
            throw new errors.NotFoundError('Profile must be filled')
        }

        const priceDeltaPercent = 20

        return {
            canGoWithChildren: profile.hasChildren ?? null,
            minPrice: profile.maxBudget ? profile.maxBudget * (1 - priceDeltaPercent / 100) : null,
            maxPrice: profile.maxBudget ? profile.maxBudget * (1 + priceDeltaPercent / 100) : null,
            minPeople: profile.peopleCount ?? null,
            maxPeople: profile.peopleCount ?? null,
            name: null,
            placeIds: profile.places.map(el => el.id),
            comfortLevelIds: profile.comfortLevels.map(el => el.id),
            difficultyLevelIds: profile.difficultyLevels.map(el => el.id),
            tourActivityIds: profile.tourActivities.map(el => el.id),
            tourTypeIds: profile.tourTypes.map(el => el.id)
        }
    }
}

export default IndexMyRecommendationsUseCase