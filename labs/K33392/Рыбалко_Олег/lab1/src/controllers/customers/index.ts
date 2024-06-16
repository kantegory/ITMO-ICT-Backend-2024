import { Customer } from '../../models/customer.js'
import { CustomersService } from '../../services/customers/index.js'
import { BaseController } from '../base/index.js'

export class CustomersController extends BaseController<Customer> {
  protected service: CustomersService

  constructor() {
    super()
    this.service = new CustomersService(Customer)
  }
}

