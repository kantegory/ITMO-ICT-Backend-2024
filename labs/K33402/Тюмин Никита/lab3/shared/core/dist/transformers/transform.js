"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transform = function (data, transformer) {
    if (data === null) {
        return null;
    }
    if (data instanceof Array) {
        return data.map((el) => {
            return transformer.transformWithIncludes(el);
        });
    }
    return transformer.transformWithIncludes(data);
};
exports.default = transform;
