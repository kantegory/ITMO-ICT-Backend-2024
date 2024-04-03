"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/"));
const db_js_1 = __importDefault(require("./providers/db.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/unicorns", routes_1.default);
app.listen(process.env.PORT, () => {
    db_js_1.default;
    console.log(`Listening on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map