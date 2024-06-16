import BaseTransformer from "./baseTransformer";
import {Model} from "sequelize";


const transform = function (data: Array<Model>|Model|null, transformer: BaseTransformer) {
    if (data === null) {
        return null
    }
    if (data instanceof Array) {
        return data.map((el) => {
            return transformer.transformWithIncludes(el)
        })
    }
    return transformer.transformWithIncludes(data)
}

export default transform