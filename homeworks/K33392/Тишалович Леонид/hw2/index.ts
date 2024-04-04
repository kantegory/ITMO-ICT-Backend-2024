import dotenv from "dotenv";
import express, { Application } from "express";
import sequelize from "./db";
import User from "./models/User";
import router from "./routes/index";

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "5000");

const app: Application = express();
app.use(express.json());
app.use("/api", router);

const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
