import { User, UserCreate } from "../../models/user/User"
import { BasicCrudInterface } from "../CRUDService"

export interface CrudUserInterface<> extends BasicCrudInterface<number, User, UserCreate>{
    findById(id: number): Promise<User | null>
    create(data: UserCreate): Promise<User>
    deleteById(id: number): Promise<number>
    updateById(id: number, data: UserCreate): Promise<User>
    findAll(): Promise<Array<User> | null>
    findByEmail(email: string): Promise<User | null>
}