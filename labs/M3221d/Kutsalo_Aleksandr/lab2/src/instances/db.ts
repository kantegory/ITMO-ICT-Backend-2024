import { Sequelize } from "sequelize-typescript";
import User from "../models/user";
import Item from "../models/product";
import ShoppingCartItem from "../models/shopping_cart_item";

const db_file = 'db.sqlite'
const username = 'root'
const password = 'root'

const sequelize = new Sequelize({
    storage: db_file,
    username: username,
    password: password,
    database: 'users_db',
    dialect: 'sqlite',
    logging: console.log
})

sequelize.addModels([User, Item, ShoppingCartItem])

sequelize.sync()

sequelize.authenticate()

export default sequelize