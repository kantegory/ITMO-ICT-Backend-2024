import User, { UserAtributes } from "../../models/users";
import jwt from 'jsonwebtoken';
import checkPas from "./checkPas";

export default class AuthServis{

    async register(userData: UserAtributes){
        try{
            const result = await User.create(userData);
            return {id: result.id};
        }catch(err){
            return err;
        }
    };

    async auth(email : string, password: string){
        try{
            const user = await User.findOne({where: {email}});
            if(!user || !checkPas(user, password)){
                throw new Error('Email or password is not correct');
            };
            const token = jwt.sign({ id: user.id, email: user.email }, "TEST_MARKET_FOR_LESSON", {expiresIn: "1d"});
            return {token: token};
        }catch (err){
            return err;
        }
    };

}