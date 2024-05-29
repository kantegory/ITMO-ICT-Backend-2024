import { Tour } from "../../../providers/sequelize";


interface IStoreTour {
    name: string
    price: number
    canGoWithChildren: boolean
    maxPeople: number
    comfortLevelId: number
    difficultyLevelId: number
    placeId: number
    tourActivities: number[]
    tourTypes: number[]
}

class StoreTourUseCase {
    static async run(data: IStoreTour): Promise<Tour> {
        // return await sequelize.transaction(async (transaction) => {
            try {
                const tour: Tour = await Tour.create({
                    name: data.name,
                    price: data.price,
                    canGoWithChildren: data.canGoWithChildren,
                    maxPeople: data.maxPeople,
                    comfortLevelId: data.comfortLevelId,
                    difficultyLevelId: data.difficultyLevelId,
                    placeId: data.placeId,
                }, {returning: true})

                await tour.$set('tourActivities', data.tourActivities)
                await tour.$set('tourTypes', data.tourTypes)

                await tour.reload({
                    include: [
                        'comfortLevel',
                        'difficultyLevel',
                        'place',
                        'tourActivities',
                        'tourTypes',
                    ]
                })

                return tour
            } catch (error) {
                // await transaction.rollback();
                throw error
            }
        // })
    }
}

export default StoreTourUseCase