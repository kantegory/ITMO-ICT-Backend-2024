"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const discountsRoute_1 = __importDefault(require("./routes/discounts/discountsRoute"));
const ordersRoute_1 = __importDefault(require("./routes/orders/ordersRoute"));
const productsRoute_1 = __importDefault(require("./routes/products/productsRoute"));
const promotionsRoute_1 = __importDefault(require("./routes/promotions/promotionsRoute"));
const db_1 = __importDefault(require("./providers/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const authenticateToken_1 = __importDefault(require("./middleware/authenticateToken"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use("/discounts", authenticateToken_1.default, discountsRoute_1.default);
app.use("/orders", authenticateToken_1.default, ordersRoute_1.default);
app.use("/products", productsRoute_1.default);
app.use("/promotions", authenticateToken_1.default, promotionsRoute_1.default);
app.listen(PORT, () => {
    db_1.default;
    console.log(`Server is running on port ${PORT}`);
});
