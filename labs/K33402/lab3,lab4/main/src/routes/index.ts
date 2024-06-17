import Express, {NextFunction, Request, Response}  from "express";
import amqp from 'amqplib'
// import userRout from './user';
import currencytRout from './currency';
import balanceRout from './balance';
// import authoRout from './auth'
import historyRout from './history';
// import { auth } from "../middelwaers/auth";

const rabbitUrl = "amqp://rabbitmq:5672"; 
const queueName = "auth_queue"; 

const auth = async (req: Request , res: Response, next: NextFunction) => {
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    interface CustomRequest extends Request {
        user: any;
      }
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ "error": 'Missing token' });
    }
  
    const message = { token };
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  
    const result = await channel.get(queueName);
    if (result === null) {
      return res.status(401).send({ "error": 'Authentication failed' });
    }
  
    const userData = JSON.parse(result.toString());
    (req as CustomRequest).user = userData;
    next();
  };

const rout: Express.Router = Express.Router();

// rout.use('/users', userRout);
// rout.use('/currency', auth, currencytRout);
rout.use('/balance',  balanceRout);
rout.use('/history', historyRout)
// rout.use('/aut',  authoRout);



export default rout;

