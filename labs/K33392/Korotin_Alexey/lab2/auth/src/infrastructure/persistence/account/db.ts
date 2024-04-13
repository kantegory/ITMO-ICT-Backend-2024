import {Sequelize} from "sequelize-typescript";
import {Account} from "./models/Account";
import {Dialect} from "sequelize";


const sequelize = new Sequelize({
    database: process.env.database,
    dialect: process.env.dialect as Dialect,
    host: process.env.host,
    port: Number(process.env.port),
    username: process.env.db_username,
    password: process.env.db_password,
    logging: console.log,
    repositoryMode: true
});

const models = [Account, ];

sequelize.addModels(models);

sequelize
    .sync()
    .then(() => {
        console.info('Sync completed');
    })
    .catch((e) => {
        console.error(e);
    });

sequelize.authenticate()
    .then(() => console.info("Connection has been established."))
    .catch((e) => console.error('Unable to connect to the database:', e))

export default sequelize;