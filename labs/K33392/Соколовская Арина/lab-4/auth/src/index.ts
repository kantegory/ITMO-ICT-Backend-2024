import express from "express";
import 'dotenv/config'
import sequelize from "./config/db";
import router from "./route/index"
import { startConsumer } from "./rabbitMQ/handleMessage";


const app = express()
app.use(express.json());

app.use('', router);

const startServer = async() => {
    await startConsumer();

    app.listen(process.env.port, () => {
        sequelize.sync();
        console.log(`Running on port ${process.env.port}`);
    });
}

startServer();