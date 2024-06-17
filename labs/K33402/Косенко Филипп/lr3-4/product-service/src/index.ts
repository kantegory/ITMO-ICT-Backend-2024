import sequelize from "./conection/db";
import amqplib, {Connection, Channel} from 'amqplib'
import express from "express";
import bodyParser from 'body-parser'
import rout from "./routes" ;
import  dotenv  from "dotenv";

const app = express();


app.use(bodyParser.json({ strict: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(rout)
dotenv.config()

const port = process.env.PORT;

sequelize.sync().then(()=>{
    app.listen(port, function(){
      console.log("Сервер ожидает подключения...");
      console.log(`http://localhost:${port}`)
    });
  }).catch(err=>console.log(err));