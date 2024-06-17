import { Request, Response } from "express";
import AuthServis from "../../service/auth";
import * as amqp from 'amqplib';

export default class AuthControll{
    private authcontroll: AuthServis;
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    constructor() {
        this.authcontroll = new AuthServis();
        this.initRabbitMQ();
    };

    private async initRabbitMQ() {
        this.connection = await amqp.connect('amqp://rabbitmq:5672');
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue('auth_queue', { durable: true });
    }

    register = async (req: Request, res: Response) => {
        try{
            const result = await this.authcontroll.register(req.body);
            res.status(200).send(result);
            this.sendMessageToRabbitMQ('register', result);
        }catch(err){
            res.status(400).send(err);
        }
    };

    auth = async (req: Request, res: Response) => {
        try{
            const result = await this.authcontroll.auth(req.body.email, req.body.password);
            res.status(200).send(result);
            this.sendMessageToRabbitMQ('auth', result);
        }catch(err){
            res.status(400).send(err);
        }
    };

    private sendMessageToRabbitMQ(action: string, data: any) {
        const message = {
            action,
            data
        };
        this.channel.sendToQueue('auth_queue', Buffer.from(JSON.stringify(message)));
    }
}


// import { error } from "console";
// import AuthServis from "../../service/auth";
// import { Request, Response } from "express";

// export default class AuthControll{
//     private authcontroll: AuthServis;

//     constructor() {
//         this.authcontroll = new AuthServis();
//     }

//     register = async (req: Request, res: Response) => {
//         try{
//             const result = await this.authcontroll.register(req.body);
//             res.status(200).send(result);
//         }catch{
//             res.status(400).send(error);
//         }
//     };

//     auth = async (req: Request, res: Response) => {
//         try{
//             const result = await this.authcontroll.auth(req.body.email, req.body.password);
//             res.status(200).send(result);
//         }catch{
//             res.status(400).send(error);
//         }
//     }
// }