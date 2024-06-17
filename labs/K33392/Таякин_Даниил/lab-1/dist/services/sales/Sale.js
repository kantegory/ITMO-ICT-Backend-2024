import { BaseService } from '../base/Base.js';
import { Product } from '../../models/Product.js';
export class SaleService extends BaseService {
    constructor() {
        super(...arguments);
        this.findById = async (pk) => {
            return (await this.model.findByPk(pk, { include: Product }));
        };
        this.list = async () => {
            return await this.model.findAll({ include: Product });
        };
    }
}
//# sourceMappingURL=Sale.js.map