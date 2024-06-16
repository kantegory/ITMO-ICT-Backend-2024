import { Product } from '../../models/product.js';
import { ProductsService } from '../../services/products/index.js';
import { BaseController } from '../base/index.js';
export class ProductsController extends BaseController {
    constructor() {
        super();
        this.list = async (req, res) => {
            try {
                res.status(200).send(await this.service.list());
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.service = new ProductsService(Product);
    }
}
//# sourceMappingURL=index.js.map