import {Entity} from "../meta";
import {Account} from "../replicas/Account";


export class Profile implements Entity<string>{
    public constructor(public id: string, public name: string, public location: string,
                       public user: Account) {
    }

    public equals(other: Entity<string>): boolean {
        return this.id === other.id;
    }
}