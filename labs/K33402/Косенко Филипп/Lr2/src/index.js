"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./configs/db"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("../src/routes"));
const app = (0, express_1.default)();
const port = 8000;
app.use(body_parser_1.default.json({ strict: false }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(routes_1.default);
db_1.default.sync().then(() => {
    app.listen(port, function () {
        console.log("Сервер ожидает подключения...");
        console.log(`http://localhost/${port}`);
    });
}).catch(err => console.log(err));
