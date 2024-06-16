import {ValidationChain, validationResult} from "express-validator";
import {ValidationError} from "../errors";
import express from "express";
import {ResultWithContext} from "express-validator/lib/chain";


class BaseController {
    async validate(request: express.Request, rules: Array<ValidationChain>) {
        let promises: Array<Promise<ResultWithContext>> = []
        for (let rule of rules) {
            promises.push(rule.run(request))
        }
        await Promise.all(promises)
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors.array())
        }
    }
}

export default BaseController