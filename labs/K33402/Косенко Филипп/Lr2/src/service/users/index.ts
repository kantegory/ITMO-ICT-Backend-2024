// import { Request, Response, response } from "express";
import User, { UserAtributes } from "../../models/users";
// import { Error } from "sequelize";

class UserServis {
    
    // get = async ()=>{
    //     return res.send("hello World");
    // };

    async getAll(){
        try{
            const result: any = await User.findAll().then(err => console.log(err));
            return result!= undefined ? result : 'Sorry yuor DB is empty';
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
            const result = await User.create(userData);
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

        
    // getUser = async (req: Request, res: Response) => {
    //     try{
    //         const user = req.body;
    //         const {id} = user;
    //         const result: any = User.findOne({where: {id}}).then(err => console.log(err));
    //         const {name} = result;
    //         console.log(result.name);
    //         res.status(200).json({
    //             responce: name() 
    //         })
    //     }catch (error){
    //         console.log(error);
    //     };
    // };

    // getAllUser = async (req: Request, res: Response) => {
    //     try{
    //         const result: any = User.findAll().then(err => console.log(err));
    //         const {name} = result;
    //         res.status(200).json({
    //             response: name()
    //         })
    //     }catch (error){
    //         console.log(error);
    //         res.send(error);
    //     }
    // }
}

export default UserServis;
