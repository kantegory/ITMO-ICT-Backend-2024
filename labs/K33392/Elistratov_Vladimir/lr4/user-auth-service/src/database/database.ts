import {Sequelize} from "sequelize-typescript"
import User from "../models/user/User"
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(String(process.env.db_url))

const models = [
    User,
]

sequelize.addModels(models)
sequelize.sync().then(() => console.log("models are synced")).catch((error) => console.log(error))

export default sequelize