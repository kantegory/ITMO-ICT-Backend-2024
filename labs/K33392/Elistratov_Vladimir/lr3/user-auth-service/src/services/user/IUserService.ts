import { User, UserCreate } from "../../models/user/User"
import { BasicCrudInterface } from "../CRUDService"

export interface CrudUserInterface<> extends BasicCrudInterface<number, User, UserCreate>{
    findById(id: number): Promise<User | null>
    create(data: UserCreate): Promise<User>
    updateById(id: number, data: UserCreate): Promise<User>
    findByEmail(email: string): Promise<User | null>
}