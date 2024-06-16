import BaseRepository from "./base";
import {Account} from "../../../../domain/account/Account";
import {Account as AccountModel} from "../models/Account";
import sequelize from "../db";
import AccountFactory from "../../../../domain/factory/Account";
import {AccountRestoreAttributes} from "../../../../domain/account/Attributes";


export default class AccountRepository extends BaseRepository<string, Account, AccountModel> {
    constructor(private factory: AccountFactory) {
        super(sequelize.getRepository(AccountModel));
    }

    public async save(entity: Account): Promise<Account> {
        const attributes: AccountRestoreAttributes = {
            id: entity.id,
            email: entity.email.value,
            password: entity.password,
            role: entity.role,
            status: entity.status
        };

        const account = await this.repository.create(attributes);

        return Promise.resolve(this.mapToEntity(account));
    }

    public async findByEmail(email: string): Promise<Account> {
        const model = await this.repository.findOne({
            where: {
                email: email
            }
        });
        if (!model) {
            return Promise.reject({message: `Account with email '${email}' could not be found`});
        }

        return Promise.resolve(this.mapToEntity(model));
    }

    protected mapToEntity(model: AccountModel): Account {
        return this.factory.restore(model as AccountRestoreAttributes);
    }
}