import { BaseTransformer } from "shared-core";
import DictionaryTransformer from "./dictionaryTransformer";
import { Tour } from "../../providers/sequelize";


class TourTransformer extends BaseTransformer {
    constructor() {
        super();
        this.defaultIncludes = [
            'comfortLevel',
            'difficultyLevel',
            'place',
            'tourActivities',
            'tourTypes',
        ]
        this.availableIncludes = []
    }

    transform(tour: Tour): Object {
        return {
            id: tour.id,
            name: tour.name,
            price: tour.price,
            canGoWithChildren: tour.canGoWithChildren,
            maxPeople: tour.maxPeople,
        }
    }

    include_comfortLevel(tour: Tour) {
        return this.item(tour.comfortLevel, new DictionaryTransformer())
    }

    include_difficultyLevel(tour: Tour) {
        return this.item(tour.difficultyLevel, new DictionaryTransformer())
    }

    include_place(tour: Tour) {
        return this.item(tour.place, new DictionaryTransformer())
    }

    include_tourActivities(tour: Tour) {
        return this.collection(tour.tourActivities, new DictionaryTransformer())
    }

    include_tourTypes(tour: Tour) {
        return this.collection(tour.tourTypes, new DictionaryTransformer())
    }
}

export default TourTransformer