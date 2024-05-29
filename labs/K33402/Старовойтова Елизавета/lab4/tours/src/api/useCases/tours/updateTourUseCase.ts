import { Tour } from "../../../providers/sequelize";
import { errors } from "shared-core"


interface IUpdateTour {
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

class UpdateTourUseCase {
    static async run(id: number, data: IUpdateTour): Promise<Tour> {
        const tour = await Tour.findByPk(id);
        if (!tour) {
            throw new errors.NotFoundError('Tour does not exists')
        }

        // return await sequelize.transaction(async (transaction) => {
            try {
                await tour.update({
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

export default UpdateTourUseCase