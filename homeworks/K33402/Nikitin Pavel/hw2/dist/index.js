"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const models_1 = require("./models");
models_1.User.create({
    email: "a",
    username: "b",
    password: "c",
    id: "5",
})
    .then((user) => {
    console.log("Пользователь успешно создан:", user);
})
    .catch((error) => {
    console.error("Ошибка при создании пользователя:", error);
});
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", routes_1.UserRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
