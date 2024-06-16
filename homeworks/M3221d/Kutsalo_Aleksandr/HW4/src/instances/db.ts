import { Sequelize } from "sequelize-typescript";
import Item from "../models/Item";
import ShoppingCartItem from "../models/ShoppingCartItem";
import Tag from "../models/tag";
import ItemTag from "../models/ItemTag";
import RefreshToken from "../models/RefreshToken";
import User from "../models/user";

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

sequelize.addModels([User, Item, ShoppingCartItem, Tag, ItemTag, RefreshToken])

sequelize.sync()

sequelize.authenticate()

export default sequelize