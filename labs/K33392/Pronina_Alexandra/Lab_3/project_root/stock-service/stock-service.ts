import express from 'express';
import { StockController } from './controllers/StockController';
import { sequelize } from './models';
import { authMiddleware } from './middleware/authMiddleware';
import { RabbitMQService } from './services/RabbitMQService';

const app = express();
const PORT = 3005;

app.use(express.json());

app.post('/stocks', authMiddleware, StockController.updateStock);

sequelize.sync().then(() => {
    RabbitMQService.connect();
    app.listen(PORT, () => {
        console.log(`Stock service running on port ${PORT}`);
    });
});
