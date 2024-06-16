"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnicornService = void 0;
const unicorns_js_1 = require("../models/unicorns.js");
class UnicornService {
    async getAll() {
        try {
            return await unicorns_js_1.Unicorn.findAll();
        }
        catch {
            throw new Error("failed to get unicorns");
        }
    }
    async create(data) {
        try {
            return (await unicorns_js_1.Unicorn.create(data)).toJSON();
        }
        catch {
            throw new Error("failed to create unicorn");
        }
    }
    async update(id, newData) {
        try {
            const unicornToUpdate = await unicorns_js_1.Unicorn.findByPk(id);
            if (!unicornToUpdate)
                throw new Error(`Unicorn with id ${id} not found`);
            await unicornToUpdate.update(newData);
            return unicornToUpdate;
        }
        catch {
            throw new Error(`failed to update unicorn with id ${id}`);
        }
    }
}
exports.UnicornService = UnicornService;
//# sourceMappingURL=index.js.map