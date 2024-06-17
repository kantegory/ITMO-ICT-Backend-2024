// import { Request, Response, response } from "express";
import User, { UserAtributes } from "../../models/users";
import hashPas from "../../utilis/hashPas";
// import { Error } from "sequelize";

class UserServis {
    

    async getIdWithPassword(id: number){
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Not Found');
            }
            return user
        }
        catch (error) {
            throw error;
        }
    };

    async getAll(){
        try{
            const result: any = await User.findAll();
            return result
        }catch (error){
            console.log(error);
        }
    };

    async getById(id: number){
        try{
            const result: any = await User.findByPk(id)
            return result!= undefined ? result : 'Sorry yuor DB is empty';
        }catch(err){
            console.log(err);
        }
    };

    async create(userData: UserAtributes){
        try{
            const result = await User.create({...userData, password: hashPas(userData.password)});
            return result
        }catch (err){
            return err
        }
    };

    async updatePassword(id: number, userData: Pick<UserAtributes, 'password'>){
        try{
            const Users: any = await User.update(
                {password: userData.password},
                {where: {id: id}}
            );
            return Users;
        }catch(err){
            console.log(err);
        };
    };

    async updateEmail(id: number, userData: Pick<UserAtributes, 'email'>){
        try{
            const Users : any = await User.update(
                {email: userData.email},
                {where: {id: id}}
            );
            return Users;
        }catch(err){
            console.log(err);
        };
    };

    async delete(id: number){
        try{
            const result = await User.destroy({where: {id: id}})
            return result
        }catch(err){
            return err
        }
    }

        
   
}

export default UserServis;
