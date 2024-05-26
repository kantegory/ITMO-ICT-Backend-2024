import { Sequelize } from "sequelize-typescript";
import RefreshToken from "../models/RefreshToken";
import User from "../models/User";

const db_file = 'db.sqlite'
const username = 'root'
const password = 'root'

const sequelize = new Sequelize({
    repositoryMode: true,
    storage: db_file,
    username: username,
    password: password,
    database: 'users_db',
    dialect: 'sqlite',
    logging: console.log
})

sequelize.addModels([User, RefreshToken])

sequelize.sync()

sequelize.authenticate()

export default sequelize