import { Sequelize } from "sequelize-typescript";
import Product from "../models/product";
import Basket from "../models/basket";
import dotenv from 'dotenv';

dotenv.config()

// const url = "postgresql://postgres:2198@localhost:5443/market_bd";

// if(url === undefined){
//     throw new Error;
// }

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/models/models.db'
});
  

const models : any = [Product, Basket];
sequelize.addModels(models);

const testConection = async () => {
    try{
        await sequelize.authenticate();
        console.log('conect is good');
    } catch (err) {
        console.error('oups disconect', err);
    }
}

testConection();

export default sequelize