import Express  from "express";
import ProductController from "../../controllers/product";

const rout: Express.Router = Express.Router();

const product = new ProductController;

rout.route('/')
    .get(product.get)
    .post(product.create);

rout.get('/:id', product.getId);
rout.get('/getqua/:id', product.getQuantity);
rout.post('/update', product.update);
rout.post('/sub', product.subtraction);

export default rout