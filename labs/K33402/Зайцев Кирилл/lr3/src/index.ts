import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import { Product } from './models/product';
import { ProductController } from './controllers/ProductController';

const app = express();
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    models: [Product]
});

app.use(bodyParser.json());

const productController = new ProductController();

app.post('/products', (req, res) => productController.create(req, res));
app.put('/products/:id', (req, res) => productController.update(req, res));
app.get('/products/search', (req, res) => productController.search(req, res));

sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Product service is running on port 3001');
    });
});
