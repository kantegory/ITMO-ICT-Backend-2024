import express, { Application } from "express";
import sequelize from "./database";
import authRouter from "./routes/authRoutes";

const PORT: number = parseInt(process.env.PORT || "4000");

const app: Application = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`Auth service is running on ${PORT} port`);
  });
};

start();
