'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        patronymic: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        getterMethods: {
            fullName() {
                return `${this.firstName} ${this.lastName} ${this.patronymic}`;
            }
        },
        timestamps: false,
        defaultScope: {
            // Exclude password field by default
            attributes: { exclude: ['password'] }
        }
    });
    return User;
};