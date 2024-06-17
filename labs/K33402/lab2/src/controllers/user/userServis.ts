import { Request, Response } from "express";
// import User from "../../models/users";
import UserServis from "../../service/users";
// import { Error } from "sequelize";

class UserController {
   private userservis : UserServis;

   constructor(){
        this.userservis = new UserServis();
   };

   getAll = async (req: Request, res: Response) => {
        try{
            const users = await this.userservis.getAll();
            res.status(200).send(users);
        }catch (err){
            console.log(err);
            res.status(400).send(err);
        }
    };

    getId = async (req: Request, res: Response) => {
        try{
            const id: number = +req.params.id
            const result = await this.userservis.getById(id);
            if(result === null){
                res.status(404).send(`Not found user`);
                return
            };
            res.status(200).send(result);
        }catch (err) {
            res.status(400).send(err);
        }
    };

    create = async (req: Request, res: Response) =>{
        try{
            const user = await this.userservis.create(req.body);
            res.status(200).send(user);
        }catch (err){
            res.status(400).send(err);
        }
    };

    updatePas = async ( req: Request, res: Response) => {
        try{
            const user = await this.userservis.updatePassword(+req.params.id, req.body);
            if(user === null){
                res.status(404).send(`Not found user`);
                return
            };
            res.status(200).send(user);
        }catch(err){
            res.status(400).send(err);
        }
    };

    updateEmail = async (req: Request, res: Response) => {
        try{
            const user = await this.userservis.updateEmail(+req.params.id, req.body);
            if(user === null){
                res.status(404).send(`Not found user`);
                return
            };
            res.status(200).send(user);
        }catch (err){
            res.status(400).send(err)
        }
    }


}
export default UserController;