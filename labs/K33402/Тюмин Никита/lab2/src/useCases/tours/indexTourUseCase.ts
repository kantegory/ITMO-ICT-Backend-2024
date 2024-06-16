import Tour from "../../models/tour";
import ComfortLevel from "../../models/dictionaries/comfortLevel";
import DifficultyLevel from "../../models/dictionaries/difficultyLevel";
import Place from "../../models/dictionaries/place";
import TourActivity from "../../models/dictionaries/tourActivity";
import TourType from "../../models/dictionaries/tourType";
import {Op} from "sequelize";


export interface IIndexTourFilters {
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

interface ITourFilters {
    name: object
    price: object
    maxPeople: object
    canGoWithChildren: boolean
    comfortLevelId: object
    difficultyLevelId: object
    placeId: object
}

class IndexTourUseCase {
    static async run(filters: IIndexTourFilters): Promise<Array<Tour>> {
        const tourActivityWhere = filters.tourActivityIds.length > 0 ?
            {
                id: {[Op.in]: filters.tourActivityIds},
            } : {}
        const tourTypeWhere = filters.tourTypeIds.length > 0 ?
            {
                id: {[Op.in]: filters.tourTypeIds}
            } : {}

        const where: Partial<ITourFilters> = {}
        if (filters.minPrice || filters.maxPrice) {
            const priceFilters: any = {}
            if (filters.minPrice) priceFilters[Op.gte] = filters.minPrice
            if (filters.maxPrice) priceFilters[Op.lte] = filters.maxPrice
            where['price'] = priceFilters
        }
        if (filters.minPeople || filters.maxPeople) {
            const peopleFilters: any = {}
            if (filters.minPeople) peopleFilters[Op.gte] = filters.minPeople
            if (filters.maxPeople) peopleFilters[Op.lte] = filters.maxPeople
            where['maxPeople'] = peopleFilters
        }
        if (filters.canGoWithChildren !== null) where['canGoWithChildren'] = filters.canGoWithChildren
        if (filters.comfortLevelIds.length > 0) where['comfortLevelId'] = {[Op.in]: filters.comfortLevelIds}
        if (filters.difficultyLevelIds.length > 0) where['difficultyLevelId'] = {[Op.in]: filters.difficultyLevelIds}
        if (filters.placeIds.length > 0) where['placeId'] = {[Op.in]: filters.placeIds}
        if (filters.name !== null ) where['name'] = {[Op.like]: `%${filters.name}%`}

        return await Tour.findAll({
            include: [
                { model: ComfortLevel },
                { model: DifficultyLevel },
                { model: Place },
                { model: TourActivity, where: tourActivityWhere, required: false },
                { model: TourType, where: tourTypeWhere, required: false },
            ],
            where: where
        })
    }
}

export default IndexTourUseCase