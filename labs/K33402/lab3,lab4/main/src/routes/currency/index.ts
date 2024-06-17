import Express  from "express";
import CurrancyController from "../../controllers/currency";

const rout: Express.Router = Express.Router();

const currency = new CurrancyController;

rout.route('/')
    .get(currency.get)
    .post(currency.create);

rout.get('/:id', currency.getId);
rout.get('/getqua/:id', currency.getPrice);
rout.post('/update', currency.update);
// rout.post('/sub', product.subtraction);

export default rout