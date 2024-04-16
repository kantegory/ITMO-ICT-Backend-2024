"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRequest = void 0;
// models/ExchangeRequest.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class ExchangeRequest extends sequelize_1.Model {
}
exports.ExchangeRequest = ExchangeRequest;
ExchangeRequest.init({
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
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // Статус по умолчанию "ожидание подтверждения"
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'ExchangeRequest',
});
