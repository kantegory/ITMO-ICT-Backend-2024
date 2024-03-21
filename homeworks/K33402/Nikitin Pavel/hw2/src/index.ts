import express from "express";
import { UserRoutes } from "./routes";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use("/users", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
