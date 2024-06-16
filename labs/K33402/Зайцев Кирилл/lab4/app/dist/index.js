import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.js';
import { Product } from './models/product.js';
import { Sale } from './models/sale.js';
import { UserController } from './controllers/UserController.js';
import { ProductController } from './controllers/ProductController.js';
import { authMiddleware } from './middleware/auth.js';
import { HealthCheckController } from './controllers/HealthCheckController.js';
import { ProductProxyController } from './controllers/ProductProxyController.js';
const app = express();
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    models: [User, Product, Sale]
});
app.use(bodyParser.json());
const productProxyController = new ProductProxyController();
const userController = new UserController();
const productController = new ProductController();
app.post('/register', userController.register);
app.post('/login', userController.login);
app.post('/products', authMiddleware, (req, res) => productProxyController.create(req, res));
app.put('/products/:id', authMiddleware, (req, res) => productProxyController.update(req, res));
app.get('/products/search', (req, res) => productProxyController.search(req, res));
app.get('/health-check', (req, res) => HealthCheckController.check(req, res));
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
//# sourceMappingURL=index.js.map