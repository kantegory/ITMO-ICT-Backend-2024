import {Sequelize} from "sequelize-typescript";
import {User} from "../models/users/User";

const sequelize = new Sequelize({
    database: process.env.database,
    dialect: "sqlite",
    host: process.env.host,
    username: process.env.username,
    password: process.env.password,
    storage: process.env.storage, // if embedded
    logging: console.log
});

const models = [User,];

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