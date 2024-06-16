import UserProfile from "../../models/userProfile";


class FindUserProfileUseCase {
    static async run(id: Number): Promise<UserProfile|null> {
        try {
            // @ts-ignore
            return await UserProfile.findByPk(id, {
                include: [
                    'comfortLevels',
                    'difficultyLevels',
                    'places',
                    'tourActivities',
                    'tourTypes',
                ]
            })
        } catch (e: any) {
            return null
        }
    }
}

export default FindUserProfileUseCase