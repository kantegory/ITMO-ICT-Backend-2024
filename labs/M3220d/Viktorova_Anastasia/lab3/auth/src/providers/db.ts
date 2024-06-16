import { Sequelize } from 'sequelize-typescript'
import User from '../models/user/User'
import RefreshToken from '../models/auth/RefreshToken'
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../configs/.env') })

const sequelize = new Sequelize({
  dialect: "sqlite",
  host: process.env.HOST,
  username: process.env.DB_USER,
  password: '',
  database: 'dev_auth_database',
  storage: 'db_auth.sqlite',
});

sequelize.addModels([RefreshToken, User]);

sequelize.sync()

export default sequelize;