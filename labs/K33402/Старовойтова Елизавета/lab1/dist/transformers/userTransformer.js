"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseTransformer_1 = __importDefault(require("./baseTransformer"));
class UserTransformer extends baseTransformer_1.default {
    constructor() {
        super();
        this.defaultIncludes = ['tests'];
        this.availableIncludes = [];
    }
    transform(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    }
    include_tests(user) {
        return this.collection([user, user], new TestTransformer());
    }
}
class TestTransformer extends baseTransformer_1.default {
    constructor() {
        super();
        this.defaultIncludes = [];
        this.availableIncludes = [];
    }
    transform(user) {
        return {
            'kek': 'lol',
        };
    }
}
exports.default = UserTransformer;
