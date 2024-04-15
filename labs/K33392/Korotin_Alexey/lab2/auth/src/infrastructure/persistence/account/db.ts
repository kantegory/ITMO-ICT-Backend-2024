import {Sequelize} from "sequelize-typescript";
import {Account} from "./models/Account";
import {Dialect} from "sequelize";


const sequelize = new Sequelize({
    database: process.env["datasource.database"],
    dialect: process.env["datasource.dialect"] as Dialect,
    host: process.env["datasource.host"],
    port: Number(process.env["datasource.port"]),
    username: process.env["datasource.username"],
    password: process.env["datasource.password"],
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