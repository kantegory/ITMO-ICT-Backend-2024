import Tour from "../../models/tour";
import User from "../../models/user";
import {NotFoundError} from "../../errors";
import IndexTourUseCase, {IIndexTourFilters} from "../tours/indexTourUseCase";


class IndexMyRecommendationsUseCase {
    static async run(user: User): Promise<Tour[]> {
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
            throw new NotFoundError('Profile must be filled')
        }

        const priceDeltaPercent = 20
        let filters: IIndexTourFilters = {
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

        return await IndexTourUseCase.run(filters)
    }
}

export default IndexMyRecommendationsUseCase