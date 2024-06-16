import express from 'express';
import { OrderController } from './controllers/OrderController';
import { sequelize } from './models';
import { authMiddleware } from './middleware/authMiddleware';
import { RabbitMQService } from './services/RabbitMQService';

const app = express();
const PORT = 3002;

app.use(express.json());

app.post('/orders', authMiddleware, OrderController.createOrder);

sequelize.sync().then(() => {
    RabbitMQService.connect();
    app.listen(PORT, () => {
        console.log(`Order service running on port ${PORT}`);
    });
});
