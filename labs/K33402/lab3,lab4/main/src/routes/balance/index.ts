import Express  from "express";
import BalanceController from "../../controllers/balance";

const rout: Express.Router = Express.Router();

const balance = new BalanceController;

rout.route('/')
    .get(balance.get)
    .post(balance.create);

rout.route('/:id')
    .get(balance.getById)
    .post(balance.update);
rout.get('/user/:id', balance.getByUserId)

export default rout
