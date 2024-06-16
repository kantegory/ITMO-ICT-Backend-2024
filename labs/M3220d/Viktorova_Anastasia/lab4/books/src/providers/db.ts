import { Sequelize } from 'sequelize-typescript'
import Book from '../models/book/Book'
import ExchangeRequest from '../models/exchangeRequest/ExchangeRequest'
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../configs/.env') })

const sequelize = new Sequelize({
  dialect: "sqlite",
  host: process.env.HOST,
  username: process.env.DB_USER,
  password: '',
  database: 'dev_book_database',
  storage: 'db_book_ms.sqlite',
});

sequelize.addModels([Book, ExchangeRequest]);

sequelize.sync()

export default sequelize;