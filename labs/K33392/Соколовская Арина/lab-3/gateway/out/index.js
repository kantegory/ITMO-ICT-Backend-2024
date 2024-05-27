"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', (0, express_http_proxy_1.default)(`http://localhost:${process.env.auth_port}`));
app.use('/', (0, express_http_proxy_1.default)(`http://localhost:${process.env.app_port}`));
app.listen(process.env.port, () => {
    console.log(`Running server on port ${process.env.port}`);
});
