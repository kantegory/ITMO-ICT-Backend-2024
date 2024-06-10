import express, { Application } from "express";
import bodyParser from "body-parser";

const PORT: number = parseInt(process.env.PORT || "5000");

const app: Application = express();

app.use(bodyParser.json());

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server is on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
};

start();
