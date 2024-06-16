import express from "express";
import discountRoute from "./routes/discounts/discountsRoute";
import ordersRoutes from "./routes/orders/ordersRoute";
import productsRoutes from "./routes/products/productsRoute";
import promotionRoutes from "./routes/promotions/promotionsRoute";
import Sequelize from "./providers/db";
import dotenv from "dotenv";
import authenticateToken from "./middleware/authenticateToken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/discounts", authenticateToken, discountRoute);
app.use("/orders", authenticateToken, ordersRoutes);
app.use("/products", productsRoutes);
app.use("/promotions", authenticateToken, promotionRoutes);

app.listen(PORT, () => {
  Sequelize;
  console.log(`Server is running on port ${PORT}`);
});
