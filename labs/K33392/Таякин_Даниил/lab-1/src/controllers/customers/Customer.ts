import { Customer } from "../../models/Customer.js"
import { BaseController } from "../base/Base.js"
import { CustomerService } from "../../services/customers/Customer.js"

export class CustomerController extends BaseController<Customer> {
    protected service: CustomerService

    constructor() {
        super()
        this.service = new CustomerService(Customer)
    }
}