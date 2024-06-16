import { BaseService } from '../base/index.js';
import { Product } from '../../models/product.js';
export class SalesService extends BaseService {
    constructor() {
        super(...arguments);
        this.findByPk = async (pk) => {
            return (await this.model.findByPk(pk, { include: Product }));
        };
        this.list = async () => {
            return await this.model.findAll({ include: Product });
        };
    }
}
//# sourceMappingURL=index.js.map