require("dotenv").config();

module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    port: process.env.port,
    dialect: process.env.dialect,
    storage: process.env.storage,
  },
  test: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    port: process.env.port,
    dialect: process.env.dialect,
    storage: process.env.storage,
  },
  production: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    port: process.env.port,
    dialect: process.env.dialect,
    storage: process.env.storage,
  },
};
