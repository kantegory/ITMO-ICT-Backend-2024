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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require('dotenv').config(); // must be at the top
const express_1 = __importDefault(require("express"));
const sequelize_1 = __importDefault(require("./providers/sequelize"));
const routes_1 = require("./routes");
const errors_1 = require("./errors");
const apiResponse_1 = __importDefault(require("./responses/apiResponse"));
const cookieParser = require('cookie-parser');
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(cookieParser());
// ENV
require('dotenv').config();
// Routes
for (let router of routes_1.routers) {
    app.use(router.prefix, router.router);
}
app.use((err, req, res, next) => {
    if (err instanceof errors_1.ValidationError) {
        apiResponse_1.default.errors(res, err.errors);
        return;
    }
    else if (err instanceof errors_1.NotFoundError) {
        apiResponse_1.default.notFound(res, err.message);
    }
    else if (err instanceof errors_1.UnauthenticatedError) {
        apiResponse_1.default.error(res, 'Unauthenticated.', 401);
    }
    else {
        next(err);
    }
});
const PORT = process.env.PORT;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`app listening on port ${PORT}`);
    yield (0, sequelize_1.default)();
}));
