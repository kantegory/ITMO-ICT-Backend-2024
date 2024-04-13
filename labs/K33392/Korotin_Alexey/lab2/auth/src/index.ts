import express from "express";
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from "./presentation/http";


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/v1', routes);

app.listen(8000, "localhost", () => console.log("Hello world!"));