"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBook = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Book_1 = require("./Book");
class UserBook extends sequelize_1.Model {
}
exports.UserBook = UserBook;
UserBook.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "UserBook",
});
UserBook.belongsTo(Book_1.Book, { foreignKey: "bookId", as: "book" });
