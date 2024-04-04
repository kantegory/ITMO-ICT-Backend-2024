import { Sequelize } from 'sequelize-typescript'
import {User} from "../models/User"

const sequelize = new Sequelize({
    database: process.env.database,
    dialect: "sqlite",
    host: process.env.host,
    username: process.env.username,
    password: process.env.password,
    storage: process.env.storage, 
    logging: console.log
});

const models = [User];

sequelize.addModels(models);

console.log(sequelize._model);

sequelize
  .sync()
  .then(() => {
     //something here
     console.log('Models synced successfully');
  })
  .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

export default sequelize;