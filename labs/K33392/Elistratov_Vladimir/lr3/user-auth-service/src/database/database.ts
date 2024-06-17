import {Sequelize} from "sequelize-typescript"
import User from "../models/user/User"

const sequelize = new Sequelize({
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: 'sqlite',
    storage: './../database.sqlite'
})

const models = [
    User,
]

sequelize.addModels(models)
sequelize.sync().then(() => console.log("models are synced")).catch((error) => console.log(error))

export default sequelize