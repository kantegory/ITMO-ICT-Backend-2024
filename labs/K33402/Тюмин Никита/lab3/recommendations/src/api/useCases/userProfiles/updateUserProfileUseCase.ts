import {
    User,
    UserProfile,
    TourType,
    TourActivity,
    Place,
    DifficultyLevel,
    ComfortLevel
} from "../../../providers/sequelize";
import { errors } from "shared-core";

interface IUpdateUserProfile {
    maxBudget: number
    hasChildren: boolean
    peopleCount: number
    comfortLevels: number[]
    difficultyLevels: number[]
    places: number[]
    tourActivities: number[]
    tourTypes: number[]
}

class UpdateUserProfileUseCase {
    static async run(id: number, data: IUpdateUserProfile): Promise<UserProfile> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new errors.NotFoundError('User does not exists')
        }

        let profile = await user.fetchProfile()
        if (profile === null) {
            profile = new UserProfile()
            profile.userId = user.id
        }

        // await sequelize.transaction(async (transaction) => {
            try {
                if (profile) {
                    profile.maxBudget = data.maxBudget
                    profile.hasChildren = data.hasChildren
                    profile.peopleCount = data.peopleCount

                    await profile.save()

                    await profile.$set('comfortLevels', data.comfortLevels)
                    await profile.$set('difficultyLevels', data.difficultyLevels)
                    await profile.$set('places', data.places)
                    await profile.$set('tourActivities', data.tourActivities)
                    await profile.$set('tourTypes', data.tourTypes)
                }
            } catch (error) {
                // await transaction.rollback();
                throw error
            }
        // })

        await profile.reload({
            include: [
                { model: ComfortLevel },
                { model: DifficultyLevel },
                { model: Place },
                { model: TourActivity },
                { model: TourType },
            ]
        })

        return profile
    }
}

export default UpdateUserProfileUseCase