import { Sale } from "../../models/Sale.js";
import { BaseController } from "../base/Base.js";
import { SaleService } from "../../services/sales/Sale.js";
export class SaleController extends BaseController {
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
        this.service = new SaleService(Sale);
    }
}
//# sourceMappingURL=Sale.js.map