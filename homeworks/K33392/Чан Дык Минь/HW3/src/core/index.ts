import express, { Express } from "express"
import connection from "../db/config";
import { urlencoded } from "body-parser"
import userRouters from "../routes/users";
import { createServer, Server } from "http"
import { Sequelize } from 'sequelize-typescript'
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from 'dotenv';

dotenv.config();

class App {
    public port: number
    public host: string
  
    private app: express.Application
    private server: Server
    private connection: Sequelize

    constructor(port = 8000, host = "localhost") {
        this.port =  parseInt(<string>process.env.PORT, 10)  || port
        this.host = process.env.HOST || host
    
        this.app = this.createApp()
        this.server = this.createServer()
        this.connection = connection    
    }
    
    private createApp(): express.Application {
        const app: Express = express()

        app.use(cors())
        app.use(bodyParser.json())
        app.use(urlencoded({extended:true}));
        app.use("/users", userRouters)

        return app
      }
    
    private createServer(): Server {
        const server = createServer(this.app)
    
        return server
    }

    public start(): void {
        connection.sync().then(() => {
            console.log("Database synced successfully!", __dirname);
        }).catch((err)=>{
            console.log("Error", err);
        });
        
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App