"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const routers_1 = __importDefault(require("../routers"));
class App {
    constructor(port = 3000, host = "localhost") {
        this.port = port;
        this.host = host;
        this.app = this.createApp();
        this.server = (0, http_1.createServer)(this.app);
    }
    createApp() {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        app.use('/', routers_1.default);
        return app;
    }
    start() {
        this.server.listen(this.port, () => {
            console.log(`Running server on ${this.host}:${this.port}`);
        });
    }
}
exports.default = App;
