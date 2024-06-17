import Express  from "express";
import AuthControll from '../../controllers/auth';

const rout: Express.Router = Express.Router();

const register = new AuthControll;

rout.post('/registr', register.register);
rout.post('/auth', register.auth);

export default rout;