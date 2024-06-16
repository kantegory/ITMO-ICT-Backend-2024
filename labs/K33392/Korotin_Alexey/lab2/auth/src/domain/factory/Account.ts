import Factory from "./base";
import {Account} from "../account/Account";
import {AccountCreateAttributes, AccountRestoreAttributes} from "../account/Attributes";
import {v4} from "uuid";
import {EmailAddress} from "../account/EmailAddress";
import {DomainEvents} from "../event/DomainEvent";
import {AccountCreatedEvent} from "../account/Events";

export default class AccountFactory implements Factory<Account, AccountCreateAttributes, AccountRestoreAttributes> {

    private nextUUID(): string {
        return v4();
    }

    create(attributes: AccountCreateAttributes): Account {
        const uuid = this.nextUUID();
        const account = new Account(uuid, new EmailAddress(attributes.email), attributes.password);
        DomainEvents.dispatchEvent(new AccountCreatedEvent(account, new Date()));
        return account;
    }

    restore(attributes: AccountRestoreAttributes): Account {
        return new Account(attributes.id, new EmailAddress(attributes.email), attributes.password,
            attributes.role, attributes.status);
    }

}