import { Sequelize } from "sequelize-typescript"
import User from "../models/user/User"


const sequelize: Sequelize = new Sequelize({
    username: "root",
    password: "",
    database: "database_development",
    host: "127.0.0.1",
    dialect: 'sqlite',
    storage: "database.sqlite",
    repositoryMode: true
})

const models = [User]

sequelize.addModels(models)
sequelize.sync()
    .then(() => console.log("models are synced"))
    .catch((error) => console.log(error))

export default sequelize