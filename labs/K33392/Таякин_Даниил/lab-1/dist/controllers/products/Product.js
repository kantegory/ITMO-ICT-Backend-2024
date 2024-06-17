import { Product } from "../../models/Product.js";
import { BaseController } from "../base/Base.js";
import { ProductService } from "../../services/products/Product.js";
export class ProductController extends BaseController {
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
        this.service = new ProductService(Product);
    }
}
//# sourceMappingURL=Product.js.map