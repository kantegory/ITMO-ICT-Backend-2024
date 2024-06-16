import express from 'express';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { sequelize } from './models';
import { authMiddleware } from './middleware/authMiddleware';
import { RabbitMQService } from './services/RabbitMQService';

const app = express();
const PORT = 3003;

app.use(express.json());

app.post('/auth/register', AuthController.register);
app.post('/auth/login', AuthController.login);
app.get('/users/:id', authMiddleware, UserController.getUserById);

sequelize.sync().then(() => {
    RabbitMQService.connect();
    app.listen(PORT, () => {
        console.log(`User service running on port ${PORT}`);
    });
});
