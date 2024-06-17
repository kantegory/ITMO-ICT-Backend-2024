import { Request, Response } from "express";
import UserServis from "../../service/users";
import * as amqp from 'amqplib';

class UserController {
   private userservis: UserServis;
   private connection: amqp.Connection;
   private channel: amqp.Channel;

   constructor(){
        this.userservis = new UserServis();
        this.initRabbitMQ();
   };

   private async initRabbitMQ() {
        this.connection = await amqp.connect('amqp://rabbitmq:5672');
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue('users_queue', { durable: true });
   }

   getAll = async (req: Request, res: Response) => {
        try{
            const users = await this.userservis.getAll();
            res.status(200).send(users);
            this.sendMessageToRabbitMQ('getAll', users);
        }catch (err){
            console.log(err);
            res.status(400).send(err);
        }
    };

    getId = async (req: Request, res: Response) => {
        try{
            const id: number = Number(req.params.id)
            const result = await this.userservis.getById(id);
            if(result === null){
                res.status(404).send(`Not found user`);
                return
            };
            res.status(200).send(result);
            this.sendMessageToRabbitMQ('getId', result);
        }catch (err) {
            res.status(400).send(err);
        }
    };

    create = async (req: Request, res: Response) =>{
        try{
            const user = await this.userservis.create(req.body);
            res.status(200).send(user);
            this.sendMessageToRabbitMQ('create', user);
        }catch (err){
            res.status(400).send(err);
        }
    };

    updatePas = async ( req: Request, res: Response) => {
        try{
            const user = await this.userservis.updatePassword(Number(req.params.id), req.body);
            if(user === null){
                res.status(404).send(`Not found user`);
                return
            };
            res.status(200).send(user);
            this.sendMessageToRabbitMQ('updatePas', user);
        }catch(err){
            res.status(400).send(err);
        }
    };

    updateEmail = async (req: Request, res: Response) => {
        try{
            const user = await this.userservis.updateEmail(Number(req.params.id), req.body);
            if(user === null){
                res.status(404).send(`Not found user`);
                return
            };
            res.status(200).send(user);
            this.sendMessageToRabbitMQ('updateEmail', user);
        }catch (err){
            res.status(400).send(err)
        }
    };

    delete = async(req: Request, res: Response) => {
        try{
            const result = await this.userservis.delete(Number(req.body.id));
            if(result === null){
                res.status(404).send('Not found');
                return
            };
            res.status(200).send('Your user has been deleted');
            this.sendMessageToRabbitMQ('delete', result);
        }catch(err){
            res.status(400).send(err);
        }
    };

    private sendMessageToRabbitMQ(action: string, data: any) {
        const message = {
            action,
            data
        };
        this.channel.sendToQueue('users_queue', Buffer.from(JSON.stringify(message)));
    }
}
export default UserController;

// import { Request, Response } from "express";
// // import User from "../../models/users";
// import UserServis from "../../service/users";
// // import { Error } from "sequelize";

// class UserController {
//    private userservis : UserServis;

//    constructor(){
//         this.userservis = new UserServis();
//    };

//    getAll = async (req: Request, res: Response) => {
//         try{
//             const users = await this.userservis.getAll();
//             res.status(200).send(users);
//         }catch (err){
//             console.log(err);
//             res.status(400).send(err);
//         }
//     };

//     getId = async (req: Request, res: Response) => {
//         try{
//             const id: number = Number(req.params.id)
//             const result = await this.userservis.getById(id);
//             if(result === null){
//                 res.status(404).send(`Not found user`);
//                 return
//             };
//             res.status(200).send(result);
//         }catch (err) {
//             res.status(400).send(err);
//         }
//     };

//     create = async (req: Request, res: Response) =>{
//         try{
//             const user = await this.userservis.create(req.body);
//             res.status(200).send(user);
//         }catch (err){
//             res.status(400).send(err);
//         }
//     };

//     updatePas = async ( req: Request, res: Response) => {
//         try{
//             const user = await this.userservis.updatePassword(Number(req.params.id), req.body);
//             if(user === null){
//                 res.status(404).send(`Not found user`);
//                 return
//             };
//             res.status(200).send(user);
//         }catch(err){
//             res.status(400).send(err);
//         }
//     };

//     updateEmail = async (req: Request, res: Response) => {
//         try{
//             const user = await this.userservis.updateEmail(Number(req.params.id), req.body);
//             if(user === null){
//                 res.status(404).send(`Not found user`);
//                 return
//             };
//             res.status(200).send(user);
//         }catch (err){
//             res.status(400).send(err)
//         }
//     };

//     delete = async(req: Request, res: Response) => {
//         try{
//             const result = await this.userservis.delete(Number(req.body.id));
//             if(result === null){
//                 res.status(404).send('Not found');
//                 return
//             };
//             res.status(200).send('Your user has been deleted');
//         }catch(err){
//             res.status(400).send(err);
//         }
//     };

// }
// export default UserController;