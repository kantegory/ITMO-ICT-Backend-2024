import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
import {createServer, Server} from "http"

import routes from "../routes/v1";

class App {
    public port: number;
    public host: string;

    private readonly app: express.Application;
    private server: Server;

    constructor(port = 8000, host = "localhost") {
        this.port = Number(process.env.port) || port;
        this.host = process.env.host || host;

        this.app = this.createApp();
        this.server = createServer(this.app);
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