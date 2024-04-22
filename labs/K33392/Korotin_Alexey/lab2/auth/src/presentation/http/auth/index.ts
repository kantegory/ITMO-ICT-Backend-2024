import express from "express";
import {body} from 'express-validator';
import AuthController from "./Controller";
import AccountRepository from "../../../infrastructure/persistence/account/repositories/Account";
import AccountFactory from "../../../domain/factory/Account";
import {jwtAuthMiddleware} from '../middleware/JWT';
import {Session} from "../../../application/services/JWT";
const router = express.Router();

const controller = new AuthController(new AccountRepository(new AccountFactory()));

router.use('/protected', jwtAuthMiddleware);

/**
 * @swagger
 * components:
 *      schemas:
 *          JWT:
 *              type: object
 *              properties:
 *                  token:
 *                      type: string
 *                  issued:
 *                      type: number
 *                  expires:
 *                      type: number
 *          Credentials:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 */

/**
 * @swagger
 * tags:
 *      name: Auth
 *      description: Authentication API
 */
router.route("/login").post(body('email').notEmpty(), body('password').notEmpty(), controller.login);
router.route("/register").post(body('email').notEmpty(), body('password').notEmpty(), controller.register);
router.route('/protected').get((req, res) => {
    const session: Session = res.locals.session;

    res.status(200).json({ message: `Your sub is ${session.sub}` });
})

export default router;