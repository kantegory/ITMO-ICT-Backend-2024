import Express  from "express";
import userRout from './user';
import authRout from './auth'
// import { auth } from "../middelwaers/auth";


const rout: Express.Router = Express.Router();

rout.use('/users', userRout);
rout.use('/auth', authRout)


export default rout;

