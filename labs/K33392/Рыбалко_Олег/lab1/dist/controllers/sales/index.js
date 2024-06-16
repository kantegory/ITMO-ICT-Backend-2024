import { Sale } from '../../models/sale.js';
import { SalesService } from '../../services/sales/index.js';
import { BaseController } from '../base/index.js';
export class SalesController extends BaseController {
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
        this.service = new SalesService(Sale);
    }
}
//# sourceMappingURL=index.js.map