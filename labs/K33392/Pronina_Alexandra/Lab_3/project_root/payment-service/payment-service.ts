import express from 'express';
import { PaymentController } from './controllers/PaymentController';
import { RabbitMQService } from './services/RabbitMQService';

const app = express();
const PORT = 3004;

app.use(express.json());

app.post('/payments', PaymentController.createPayment);

RabbitMQService.connect();
app.listen(PORT, () => {
    console.log(`Payment service running on port ${PORT}`);
});
