import Express  from "express";
import UserController from "../controllers/user/userServis";
import AuthControll from "../controllers/auth";

const rout: Express.Router = Express.Router();

const userServis = new UserController;
const authServis = new AuthControll;

rout.get('/user', userServis.getAll);
rout.post('/user', userServis.create);

rout.post('/auth', authServis.auth)

export default rout