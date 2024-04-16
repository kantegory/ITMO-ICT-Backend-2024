import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Item from "../models/Item";
import ShoppingCartItem from "../models/ShoppingCartItem";
import Tag from "../models/Tag";
import ItemTag from "../models/ItemTag";

const db_file = 'db.sqlite'
const username = 'root'
const password = 'root'

const sequelize = new Sequelize({
    repositoryMode: true,
    storage: db_file,
    username: username,
    password: password,
    database: 'users_db',
    dialect: 'sqlite',
    logging: console.log
})

sequelize.addModels([User, Item, ShoppingCartItem, Tag, ItemTag])

sequelize.sync()

sequelize.authenticate()

export default sequelize