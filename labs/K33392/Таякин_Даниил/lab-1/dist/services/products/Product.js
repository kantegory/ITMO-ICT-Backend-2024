import { BaseService } from '../base/Base.js';
export class ProductService extends BaseService {
    constructor() {
        super(...arguments);
        this.list = async () => {
            return await this.model.findAll();
        };
    }
}
//# sourceMappingURL=Product.js.map