import express from "express";
import sequelize from "./db/connection";
import router from "./router/bears/router";

const app = express();
app.use(express.json());
app.use('', router);

const port = 3000
app.listen(port, () => {
    sequelize
    console.log(`listening on port ${port}`);
})