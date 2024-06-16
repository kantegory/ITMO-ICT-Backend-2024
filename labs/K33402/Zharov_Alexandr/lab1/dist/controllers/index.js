"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnicornController = void 0;
const services_1 = require("../services");
class UnicornController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                const unicorns = await this.service.getAll();
                res.send(unicorns);
            }
            catch {
                res.status(404).send({ error: "unicorns not found" });
            }
        };
        this.post = async (req, res) => {
            try {
                res.send(await this.service.create(req.body));
            }
            catch {
                res.status(400).send({ error: "invalid data specified" });
            }
        };
        this.update = async (req, res) => {
            try {
                const id = req.params.id;
                const updatedUnicorn = await this.service.update(id, req.body);
                res.send(updatedUnicorn);
            }
            catch {
                res.status(400).send({ error: "failed to update unicorn" });
            }
        };
        this.service = new services_1.UnicornService();
    }
}
exports.UnicornController = UnicornController;
//# sourceMappingURL=index.js.map