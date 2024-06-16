export class BaseService {
    constructor(model) {
        this.create = async (data) => {
            return (await this.model.create(data));
        };
        this.findByPk = async (pk) => {
            return (await this.model.findByPk(pk));
        };
        this.updateByPk = async (pk, data) => {
            return await this.model.update(data, { where: { id: pk } });
        };
        this.deleteByPk = async (pk) => {
            return await this.model.destroy({ where: { id: pk } });
        };
        this.model = model;
    }
}
//# sourceMappingURL=index.js.map