import express, { Express, Request, Response } from "express"
import connection from "./db/config";
import { json, urlencoded } from "body-parser"
import userRouters from "./routes/users";
 
const app: Express = express()

app.use(json());
app.use(urlencoded({extended:true}));
app.use("/users", userRouters)

app.get("/", (req: Request, res: Response) => {
    res.send("hello Minh, this is Lab 1 for subject Backend")
})

app.use((
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,

) => {
    res.status(500).json({message: err.message});
});

connection.sync().then(() => {
    console.log("Database synced successfully!", __dirname);
}).catch((err)=>{
    console.log("Error", err);
});


app.listen('8765')
