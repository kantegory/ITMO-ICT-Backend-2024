"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseTransformer {
    constructor() {
        this.includes = [];
        this.availableIncludes = [];
        this.defaultIncludes = [];
    }
    include(includes) {
        for (let include of includes) {
            if (this.availableIncludes.includes(include)) {
                this.includes.push(include);
            }
        }
        return this;
    }
    transformWithIncludes(item) {
        let data = this.transform(item);
        for (let include of [...new Set(this.defaultIncludes.concat(this.includes))]) {
            //@ts-ignore
            data[include] = this['include_' + include](item);
        }
        return data;
    }
    item(data, transformer) {
        if (data === null) {
            return null;
        }
        return transformer.transformWithIncludes(data);
    }
    collection(data, transformer) {
        return data.map((el) => {
            return this.item(el, transformer);
        });
    }
}
exports.default = BaseTransformer;
