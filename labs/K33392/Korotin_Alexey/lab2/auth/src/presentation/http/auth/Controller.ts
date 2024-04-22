import AccountRepository from "../../../infrastructure/persistence/account/repositories/Account";
import AccountFactory from "../../../domain/factory/Account";
import {AccountCreateAttributes} from "../../../domain/account/Attributes";
import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import {encodeSession, PartialSession} from "../../../application/services/JWT";
import {InvalidEmailException} from "../../../domain/account/EmailAddress";
import {validationResult} from 'express-validator';
export default class AuthController {

    public constructor(private repository: AccountRepository,
                       private factory: AccountFactory = new AccountFactory()) {
    }

    /**
     * @swagger
     * /auth/register:
     *      post:
     *          tags: [Auth]
     *          summary: Create account and receive a JWT
     *          requestBody:
     *              description: Authentication credentials
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#components/schemas/Credentials'
     *          responses:
     *              201:
     *                  description: Account created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#components/schemas/JWT'
     *              400:
     *                  description: Invalid credentials provided
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *              409:
     *                  description: Conflict. Email is already taken
     */
    register = async (req: Request, res: Response) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({errors: result.array()});
        }
        const attributes: AccountCreateAttributes = req.body;
        attributes.password = bcrypt.hashSync(attributes.password, 10);
        try {
            let account = this.factory.create(attributes);
            account = await this.repository.save(account);
            const session: PartialSession = {
                sub: account.id,
                email: account.email.value,
                role: account.role,
                status: account.status
            };

            const result = encodeSession(session);
            return res.status(201).json(result);

        }  catch (e: any) {
            if (e instanceof InvalidEmailException) {
                return res.status(400).json({message: "Email is invalid"});
            }
            return res.status(409).send();
        }
    }
    /**
     * @swagger
     * /auth/login:
     *      post:
     *          tags: [Auth]
     *          summary: Log in into the existing account
     *          requestBody:
     *              description: Authentication credentials
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#components/schemas/Credentials'
     *          responses:
     *              200:
     *                  description: Ok
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#components/schemas/JWT'
     *              400:
     *                  description: Bad request
     *              401:
     *                  description: Invalid credentials
     */
    login = async (req: Request, res: Response) => {
        const bindingResult = validationResult(req);
        if (!bindingResult.isEmpty()) {
            res.status(400).json({errors: bindingResult.array()});
        }
        const attributes: AccountCreateAttributes = req.body;

        const existing = await this.repository.findByEmail(attributes.email)
            .catch((r) => {
                res.status(401).json(r);
                return null;
            });
        if (!existing) {
            return res;
        }
        if (!await bcrypt.compare(attributes.password, existing.password)) {
            return res.status(401).json("Invalid credentials");
        }

        const session: PartialSession = {
            sub: existing.id,
            email: existing.email.value,
            role: existing.role,
            status: existing.status
        };

        const result = encodeSession(session);
        res.status(200).json(result);

    }
}