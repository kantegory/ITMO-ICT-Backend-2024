import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.js';
import { Product } from './models/product.js';
import { Sale } from './models/sale.js';
import { UserController } from './controllers/UserController.js';
import { HealthCheckController } from './controllers/HealthCheckController.js';

const app = express();
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'postgres',
    username: 'postgres',
    password: 'Kirill307477',
    database: 'dockerBD',
    models: [User, Product, Sale]
});

app.use(bodyParser.json());

const userController = new UserController();

app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/health-check', (req, res) => HealthCheckController.check(req, res));

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

