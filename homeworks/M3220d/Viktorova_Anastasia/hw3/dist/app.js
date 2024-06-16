"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const index_1 = __importDefault(require("./routes/v1/index"));
const db_1 = __importDefault(require("./db"));
const body_parser_1 = __importDefault(require("body-parser"));
class App {
    constructor(port = 3000, host = "localhost") {
        this.port = port;
        this.host = host;
        this.app = this.createApp();
        this.server = (0, http_1.createServer)(this.app);
        this.sequelize = db_1.default;
    }
    createApp() {
        const app = (0, express_1.default)();
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(body_parser_1.default.json());
        app.use('/v1', index_1.default);
        return app;
    }
    start() {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`);
        });
    }
}
exports.default = App;
