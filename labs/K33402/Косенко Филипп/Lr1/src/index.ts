import express from 'express';
import sequelize from './config/database';
import bodyParser from 'body-parser'
import rout from "../src/route";

const app = express();
const port = 8000;

app.use(bodyParser.json({ strict: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(rout);

sequelize.sync().then(()=>{
  app.listen(port, function(){
    console.log("Сервер ожидает подключения...");
  });
}).catch(err=>console.log(err));
