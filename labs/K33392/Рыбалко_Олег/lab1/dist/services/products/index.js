import { BaseService } from '../base/index.js';
export class ProductsService extends BaseService {
    constructor() {
        super(...arguments);
        this.list = async () => {
            return await this.model.findAll();
        };
    }
}
//# sourceMappingURL=index.js.map