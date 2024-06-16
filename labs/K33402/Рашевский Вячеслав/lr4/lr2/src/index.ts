import express from 'express'
import bodyParser from 'body-parser'
import { Sequelize } from 'sequelize-typescript'
import { User } from './models/user.js'
import { Product } from './models/product.js'
import { Discount } from './models/discount.js'
import { UserController } from './controllers/UserController.js'
//import { ProductController } from './controllers/ProductController.js'
import { authMiddleware } from './middleware/auth.js'
import { ProjectCheckEndpoint } from './controllers/ProjectCheckEndpoint.js';

const app = express()
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'postgres',
    username: 'postgres',
    password: 'postgres',
    database: 'db',
    models: [User, Product, Discount]
});

app.use(bodyParser.json())

const userController = new UserController()
//const productController = new ProductController()

app.post('/registration', userController.registration)
app.post('/login', userController.login)
app.get('/lab_check', (req, res) => ProjectCheckEndpoint.check(req, res));

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
})

