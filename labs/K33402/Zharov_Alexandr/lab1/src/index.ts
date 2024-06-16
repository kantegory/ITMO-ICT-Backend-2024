import express from "express";
import unicornsRouter from "./routes/";
import sequelize from "./providers/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/unicorns", unicornsRouter);

app.listen(process.env.PORT, () => {
  sequelize;
  console.log(`Listening on port ${process.env.PORT}`);
});
