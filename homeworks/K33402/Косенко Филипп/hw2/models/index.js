const { Sequelize } = require("sequelize");

//Создание новой таблице на базе бд SQLLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./data/users.sqlite"
});

// Описание модели пользователя
const user = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      course:{
        type: Sequelize.INTEGER,
        allowNull: true
      }
});

module.exports = user

// sequelize.sync().then(result=>{
//     console.log(result)
// })
// .catch(err => console.log(err))