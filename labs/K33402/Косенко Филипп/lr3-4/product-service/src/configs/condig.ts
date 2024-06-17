import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 8000,
  db: {
    database: process.env.DB_NAME || 'some_db',
    dialect: process.env.DB_DIALECT || 'postgre',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    storage: process.env.DB_STORAGE || 'db.sqlite',
  },
  secretKey: process.env.SECRET_KEY,
};