import Express  from "express";
import userRout from './user';
import currencytRout from './currency';
import balanceRout from './balance';
import authoRout from './auth'
import historyRout from './history';
import { auth } from "../middelwaers/auth";


const rout: Express.Router = Express.Router();

rout.use('/users', userRout);
rout.use('/currency', currencytRout);
rout.use('/balance',  balanceRout);
rout.use('/history', historyRout)
rout.use('/aut',  authoRout);



export default rout;

