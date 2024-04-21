"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const body_parser_1 = __importDefault(require("body-parser"));
const route_1 = __importDefault(require("../src/route"));
const app = (0, express_1.default)();
const port = 8000;
app.use(body_parser_1.default.json({ strict: false }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(route_1.default);
database_1.default.sync().then(() => {
    app.listen(port, function () {
        console.log("Сервер ожидает подключения...");
    });
}).catch(err => console.log(err));
