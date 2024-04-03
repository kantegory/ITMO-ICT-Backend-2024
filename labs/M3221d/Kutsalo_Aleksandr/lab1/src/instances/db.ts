import { Sequelize } from "sequelize-typescript";
import User from "../models/user";

const db_file = 'db.sqlite'
const username = 'root'
const password = 'root'

const sequelize = new Sequelize(db_file, username, password,  {
    database: 'users_db',
    dialect: 'sqlite',
    logging: console.log
})

sequelize.addModels([User])

sequelize.sync()

sequelize.authenticate()

export default sequelize