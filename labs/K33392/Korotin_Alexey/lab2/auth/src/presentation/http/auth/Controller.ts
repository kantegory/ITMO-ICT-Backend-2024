import AccountRepository from "../../../infrastructure/persistence/account/repositories/Account";
import AccountFactory from "../../../domain/factory/Account";
import {AccountCreateAttributes} from "../../../domain/account/Attributes";
import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import {encodeSession, PartialSession} from "../../../application/services/JWT";

export default class AuthController {

    public constructor(private repository: AccountRepository,
                       private factory: AccountFactory = new AccountFactory()) {
    }

    register = async (req: Request, res: Response) => {
        const attributes: AccountCreateAttributes = req.body;
        attributes.password = bcrypt.hashSync(attributes.password, 10);
        let account = this.factory.create(attributes);
        try {
            account = await this.repository.save(account);
        } catch (e: any) {
            return res.status(409).send();
        }

        const session: PartialSession = {
            sub: account.id,
            email: account.email.value,
            role: account.role,
            status: account.status
        };

        const result = encodeSession(session);
        res.status(201).json(result);
    }

    public login = async (req: Request, res: Response) => {
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