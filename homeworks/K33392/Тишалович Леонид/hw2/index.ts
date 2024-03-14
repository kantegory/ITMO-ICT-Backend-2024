import express, { Application } from "express";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";
import { initUser } from "./models/User";
import userRoutes from "./routes/users";

const app: Application = express();

const sequelize: Sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

initUser(sequelize);

app.use(bodyParser.json());

app.use("/users", userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
