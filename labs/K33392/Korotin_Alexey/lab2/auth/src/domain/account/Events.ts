import {DomainEvent} from "../event/DomainEvent";
import {Account} from "./Account";

export class AccountCreatedEvent implements DomainEvent<Account> {
    constructor(public entity: Account, public publishDateTime: Date) {

    }
}