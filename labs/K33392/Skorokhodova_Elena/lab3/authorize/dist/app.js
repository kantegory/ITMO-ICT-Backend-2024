"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = require("./src/routes/userRoutes");
const app = (0, express_1.default)();
dotenv_1.default.config();
console.log(process.env.JWT_SECRET_KEY);
app.use(body_parser_1.default.json());
app.use(userRoutes_1.userRoutes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
