import { Router } from 'express';
import { CustomerController } from '../controllers/customers/Customer.js';
const customerRouter = Router();
const controller = new CustomerController();
customerRouter.get('/:pk', controller.get);
customerRouter.post('/', controller.post);
customerRouter.put('/:pk', controller.put);
customerRouter.delete('/:pk', controller.delete);
export default customerRouter;
//# sourceMappingURL=Customer.js.map