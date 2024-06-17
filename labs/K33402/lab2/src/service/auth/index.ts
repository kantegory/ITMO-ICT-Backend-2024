import User, { UserAtributes } from "../../models/users";
import jwt from 'jsonwebtoken';
import  bcrypt  from "bcrypt";
import hashPas from '../../utilis/hashPas'

export default class AuthServis{
    
    async register(userData: UserAtributes){
        try{
            const result = await User.create({...userData, password: hashPas(userData.password)});
            return {id: result.id};
        }catch(err){
            return err;
        }
    };

    async auth(email : string, password: string){
        try{
            const user: any = await User.findOne({where: {email}});
            // await checkPas(user, password))
            if(!user || !(bcrypt.compareSync((password),(user.password)))){
                throw new Error('Email or password is not correct');
            };
            const token = jwt.sign({ id: user.id }, "TEST_MARKET_FOR_LESSON", {expiresIn: "1d"});
            return {token};
        }catch (err){
            return err;
        }
    };

}