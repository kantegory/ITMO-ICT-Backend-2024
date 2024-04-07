import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
import {createServer, Server} from "http"

import routes from "../routers";

class App {
    private port: number
    private host: string

    private readonly app: express.Application
    private server: Server

    constructor(port = 3000, host = "localhost") {
        this.port = port
        this.host = host

        this.app = this.createApp();
        this.server = createServer(this.app);
    }

    private createApp(): express.Application {
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.use('/', routes);

        return app;
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on ${this.host}:${this.port}`);
        })
    }
}

export default App
