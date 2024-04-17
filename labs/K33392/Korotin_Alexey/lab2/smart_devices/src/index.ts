import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from "./presentation/http";

const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 8000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/v1', routes);


const appHost = process.env["app.host"] ?? DEFAULT_HOST;
const appPort = Number(process.env["app.port"]) ?? DEFAULT_PORT;

app.listen(appPort, appHost, () => console.log(`Application have started listening ${appHost} at port ${appPort}`));
