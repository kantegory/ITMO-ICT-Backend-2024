import express from "express";
import AuthController from "./Controller";
import AccountRepository from "../../../infrastructure/persistence/account/repositories/Account";
import AccountFactory from "../../../domain/factory/Account";
import {jwtAuthMiddleware} from '../middleware/JWT';
import {Session} from "../../../application/services/JWT";
const router = express.Router();

const controller = new AuthController(new AccountRepository(new AccountFactory()));

router.use('/protected', jwtAuthMiddleware);

router.route("/login").post(controller.login);
router.route("/register").post(controller.register);
router.route('/protected').get((req, res) => {
    const session: Session = res.locals.session;

    res.status(200).json({ message: `Your sub is ${session.sub}` });
})

export default router;