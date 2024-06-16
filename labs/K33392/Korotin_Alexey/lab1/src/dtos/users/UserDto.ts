import Dto from "../Dto";
import {User} from "../../models/users/User";

export class ReturnUserDto implements Dto<User>{
    id: Number;
    name: String;
    email: String;
}
