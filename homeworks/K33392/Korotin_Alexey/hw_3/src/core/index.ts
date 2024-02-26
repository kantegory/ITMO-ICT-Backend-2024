import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
import {createServer, Server} from "http"
import {Sequelize} from "sequelize-typescript";

import sequelize from "../db/db";

import routes from "../routes/v1";

class App {
    public port: number;
    public host: string;

    private readonly app: express.Application;
    private server: Server;
    private sequelize: Sequelize;

    constructor(port = 8000, host = "localhost") {
        this.port = Number(process.env.port) || port;
        this.host = process.env.host || host;

        this.app = this.createApp();
        this.server = createServer(this.app);
        this.sequelize = sequelize;
    }

    private createApp(): express.Application {
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.use('/v1', routes);

        return app;
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`);
        })
    }
}

export default App;