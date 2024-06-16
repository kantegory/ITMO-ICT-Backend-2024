import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import { Product } from './models/product';
import { ProductController } from './controllers/ProductController';
import { authMiddleware } from './middleware/auth';

const app = express();
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'postgres',
    username: 'postgres',
    password: 'postgres',
    database: 'db',
    models: [Product]
});

app.use(bodyParser.json());

const productController = new ProductController();

app.post('/products', authMiddleware, productController.create);
app.put('/products/:id', authMiddleware, productController.update);
app.get('/products/search', productController.search);

sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Product service is running on port 3001');
    });
});
