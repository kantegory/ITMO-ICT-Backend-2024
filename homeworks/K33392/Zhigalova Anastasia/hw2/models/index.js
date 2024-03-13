'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;



app.get('/users', async (req, res) => { //Получение пользователей

  try {
    const users = await db.User.findAll()
    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}),


app.get('/users/:id', async (req, res) => { //Получение пользователя по id

  try {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
      return res.send(user.toJSON())
    } else {
      return res.send({ message: "User not found" })
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}),


app.post('/users', async (req, res) => { //Создание нового пользователя

  try {
    const newUser = await db.User.create(req.body)
    res.status(200).json(newUser)

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}),


app.delete('/users/:id', async (req, res) => { //Удаление пользователя

  try {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
      await user.destroy()
      res.status(200).send()
    } else {
      res.status(404).json({ message: 'User not found' })
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}),


app.patch('/users/:id', async (req, res) => { //Изменение данных пользователя

  try {
    const user = await db.User.findByPk(req.params.id);

    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});