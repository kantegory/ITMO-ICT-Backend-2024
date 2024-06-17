import Express, { NextFunction, Request, Response}  from "express";
import productRout from './product';
import cartRout from './cart';
import amqp from "amqplib";

const rabbitUrl = "amqp://rabbitmq:5672"; // замените на ваш URL RabbitMQ
const queueName = "auth_queue"; // имя очереди




const rout: Express.Router = Express.Router();

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
  

rout.use('/product', auth, productRout);
rout.use('/basket',  cartRout);




export default rout;

