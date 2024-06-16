import BaseTransformer from "./baseTransformer";
import BaseDictionary from "../models/dictionaries/base";


class DictionaryTransformer extends BaseTransformer {
    constructor() {
        super();
        this.defaultIncludes = []
        this.availableIncludes = []
    }

    transform(dictionary: BaseDictionary): Object {
        return {
            id: dictionary.id,
            name: dictionary.name,
        }
    }
}

export default DictionaryTransformer