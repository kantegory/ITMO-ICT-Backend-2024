import {Mapper} from "../mapper";
import {Account} from "../../../domain/replicas/Account";
import {AccountModel} from './index';


export default class AccountMapper implements Mapper<Account, AccountModel> {
    public toEntity(model: AccountModel): Account {
        return new Account(model.id, model.email, model.password, model.role, model.status);
    }

    public toModel(entity: Account): AccountModel {
        return new AccountModel({
            id: entity.id,
            email: entity.email,
            password: entity.password,
            role: entity.role,
            status: entity.status
        });
    }

}