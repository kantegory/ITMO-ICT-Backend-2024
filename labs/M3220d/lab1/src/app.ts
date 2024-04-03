import express from "express"
import { createServer, Server } from "http"
import routes from "./routes/v1/index"
import sequelize from "./db"
import { Sequelize } from 'sequelize-typescript'
import bodyParser from "body-parser"
import cors from "cors"
import path from 'path'


class App {
    public port: number
    public host: string
  
    private app: express.Application
    private server: Server
    private sequelize: Sequelize

    constructor(port = 3000, host = "localhost") {
        this.port = port
        this.host = host
    
        this.app = this.createApp()
        this.server = createServer(this.app)
        this.sequelize = sequelize    
    }
    
    private createApp(): express.Application {
        const app = express()
        app.use(express.urlencoded({ extended: true }))
        app.use(bodyParser.json())

        app.use('/v1', routes)
        
        return app
      }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App