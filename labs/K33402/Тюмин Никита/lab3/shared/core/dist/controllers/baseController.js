"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const errors_1 = require("../errors");
class BaseController {
    validate(request, rules) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            for (let rule of rules) {
                promises.push(rule.run(request));
            }
            yield Promise.all(promises);
            const errors = (0, express_validator_1.validationResult)(request);
            if (!errors.isEmpty()) {
                throw new errors_1.ValidationError(errors.array());
            }
        });
    }
}
exports.default = BaseController;
