export class BaseService {
    constructor(model) {
        this.create = async (data) => {
            return (await this.model.create(data));
        };
        this.getById = async (id) => {
            return (await this.model.findByPk(id));
        };
        this.updateById = async (id, data) => {
            return await this.model.update(data, { where: { id: id } });
        };
        this.deleteById = async (id) => {
            return await this.model.destroy({ where: { id: id } });
        };
        this.model = model;
    }
}
//# sourceMappingURL=Base.js.map