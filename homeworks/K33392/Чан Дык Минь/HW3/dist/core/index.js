"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../db/config"));
const body_parser_1 = require("body-parser");
const users_1 = __importDefault(require("../routes/users"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const body_parser_2 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class App {
    constructor(port = 8000, host = "localhost") {
        this.port = parseInt(process.env.PORT, 10) || port;
        this.host = process.env.HOST || host;
        this.app = this.createApp();
        this.server = this.createServer();
        this.connection = config_1.default;
    }
    createApp() {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(body_parser_2.default.json());
        app.use((0, body_parser_1.urlencoded)({ extended: true }));
        app.use("/users", users_1.default);
        return app;
    }
    createServer() {
        const server = (0, http_1.createServer)(this.app);
        return server;
    }
    start() {
        config_1.default.sync().then(() => {
            console.log("Database synced successfully!", __dirname);
        }).catch((err) => {
            console.log("Error", err);
        });
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`);
        });
    }
}
exports.default = App;
