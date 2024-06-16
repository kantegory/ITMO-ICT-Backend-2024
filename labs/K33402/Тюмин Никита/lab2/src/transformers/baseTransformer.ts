import {Model} from "sequelize";


abstract class BaseTransformer {
    includes: Array<string>
    availableIncludes: Array<string>
    defaultIncludes: Array<string>
    constructor() {
        this.includes = [];
        this.availableIncludes = [];
        this.defaultIncludes = [];
    }
    abstract transform (item: Model): Object

    include(includes: Array<string>) {
        for (let include of includes) {
            if (this.availableIncludes.includes(include)) {
                this.includes.push(include)
            }
        }
        return this
    }

    transformWithIncludes(item: Model): Object {
        let data = this.transform(item)
        for (let include of [... new Set(this.defaultIncludes.concat(this.includes))]) {
            //@ts-ignore
            data[include] = this['include_' + include](item)
        }
        return data
    }

    item(data: Model|null, transformer: BaseTransformer) {
        if (data === null) {
            return null
        }
        return transformer.transformWithIncludes(data)
    }

    collection(data: Array<Model>, transformer: BaseTransformer) {
        return data.map((el: Model) => {
            return this.item(el, transformer)
        })
    }
}

export default BaseTransformer