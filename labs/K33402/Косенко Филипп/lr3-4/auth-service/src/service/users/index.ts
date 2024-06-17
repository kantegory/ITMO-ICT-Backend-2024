import User, { UserAtributes } from "../../model/users";
import hashPas from "../../utilis/hashPas";


class UserServis {
    

    async getIdWithPassword(id: number){
        try {
            const user = await User.findByPk(id)
            if (!user) {
                throw new Error('Not Found');
            }
            return user
        }
        catch{
            console.error("Ошибка:", Error);
            throw Error
        }
    };

    async getAll(){
        try{
            const result: any = await User.findAll();
            if (result === undefined ){
                throw Error;
            }
            return result;  
        }catch{
            console.error("Ошибка:", Error);
            return Error
        }
    };

    async getById(id: number){
        try{
            const result: any = await User.findByPk(id)
            if (result === undefined ){
                throw Error;
            }
            return result;  
        }catch(err){
            console.error("Ошибка:", err);
            return err
        }
    };

    async create(userData: UserAtributes){
        try{
            const result = await User.create({...userData, password: hashPas(userData.password)});
            return result
        }catch (err){
            console.error("Ошибка:", err);
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
            console.error("Ошибка:", err); 
            return err
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
            console.error("Ошибка:", err); 
            return err;
        };
    };

    async delete(idUser: number){
        try{
            const result = await User.destroy({where: {id: idUser}});
            return result
        }catch(err){
            console.error("Ошибка при удалении пользователя:", err); 
            return err
        }
    };

}

export default UserServis;
