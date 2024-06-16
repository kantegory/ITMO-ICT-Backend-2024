import { Customer } from '../../models/customer.js';
import { CustomersService } from '../../services/customers/index.js';
import { BaseController } from '../base/index.js';
export class CustomersController extends BaseController {
    constructor() {
        super();
        this.service = new CustomersService(Customer);
    }
}
//# sourceMappingURL=index.js.map