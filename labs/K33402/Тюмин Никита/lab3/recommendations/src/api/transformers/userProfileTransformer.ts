import { BaseTransformer } from "shared-core";
import { UserProfile } from "../../providers/sequelize";
import DictionaryTransformer from "./dictionaryTransformer";


class UserProfileTransformer extends BaseTransformer {
    constructor() {
        super();
        this.defaultIncludes = [
            'comfortLevels',
            'difficultyLevels',
            'places',
            'tourActivities',
            'tourTypes',
        ]
        this.availableIncludes = []
    }

    transform(profile: UserProfile): Object {
        return {
            userId: profile.userId,
            maxBudget: profile.maxBudget,
            hasChildren: profile.hasChildren,
            peopleCount: profile.peopleCount,
        }
    }

    include_comfortLevels(profile: UserProfile) {
        return this.collection(profile.comfortLevels ?? [], new DictionaryTransformer())
    }

    include_difficultyLevels(profile: UserProfile) {
        return this.collection(profile.difficultyLevels ?? [], new DictionaryTransformer())
    }

    include_places(profile: UserProfile) {
        return this.collection(profile.places ?? [], new DictionaryTransformer())
    }

    include_tourActivities(profile: UserProfile) {
        return this.collection(profile.tourActivities ?? [], new DictionaryTransformer())
    }

    include_tourTypes(profile: UserProfile) {
        return this.collection(profile.tourTypes ?? [], new DictionaryTransformer())
    }
}

export default UserProfileTransformer