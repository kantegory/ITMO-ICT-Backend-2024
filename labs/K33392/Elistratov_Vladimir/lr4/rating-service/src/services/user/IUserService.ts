import { RatingAdd } from "../../models/rating/Rating"
import { User, UserCreate } from "../../models/user/User"
import { BasicCrudInterface } from "../CRUDService"

export interface CrudUserInterface<> extends BasicCrudInterface<number, User, UserCreate>{
    findById(id: number): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    addRating(id: number, data: RatingAdd): void
}