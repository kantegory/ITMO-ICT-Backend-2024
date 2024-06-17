import { Sequelize } from "sequelize-typescript";
// import User from "../models/users"
import Currency from "../models/currency"
import Basket from "../models/balance";
import History from "../models/history";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/models/models.db'
})

const models : any = [Currency, Basket, History];
sequelize.addModels(models);

Currency.sync()


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