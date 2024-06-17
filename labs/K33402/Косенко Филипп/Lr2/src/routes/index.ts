import Express  from "express";
import UserController from "../controllers/user/userServis";
import ProductController from "../controllers/product";
import BasketController from "../controllers/basket";
import AuthControll from "../controllers/auth";

const rout: Express.Router = Express.Router();

const userServis = new UserController;
const product = new ProductController;
const basket = new BasketController;
const register = new AuthControll;


// Rout for User
rout.get('/hello', userServis.get);
rout.post('/creu', userServis.create);
rout.get('/user/:id', userServis.getId);


// Rout for product
rout.get('/product', product.get);
rout.get('/get/:id', product.getId);
rout.post('/create', product.create);
rout.get('/:id', product.getQuantity);
rout.post('/up', product.update);
rout.post('/sub', product.subtraction);

// Rout for basket
rout.get('/basket', basket.get);
rout.get('/bas/:id', basket.getById)
rout.post('/basket/create', basket.create)

// Rout for auth
rout.post('/registr', register.register);
rout.post('/auth', register.auth)

export default rout;

