import { BaseTransformer } from "shared-core";
import { BaseDictionary } from "shared-database";


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