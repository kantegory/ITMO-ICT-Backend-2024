import express from 'express';
import dotenv from 'dotenv';
import sequelize from './providers/db.js';
import usersRouter from './routes/users/index.js';
import amqp from 'amqplib';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/users', usersRouter);
app.listen(+process.env.PORT, '0.0.0.0', () => {
    sequelize; // to not delete after compilation
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'rpc_queue';
            channel.assertQueue(queue, {
                durable: false,
            });
            channel.prefetch(1);
            console.log(' [x] Awaiting RPC requests');
            channel.consume(queue, function reply(msg) {
                channel.sendToQueue(msg.properties.replyTo, msg.content, {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        });
    });
    console.log(`Listening on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map