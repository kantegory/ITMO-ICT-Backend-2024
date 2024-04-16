'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        // Добавляем поле password без ограничения NOT NULL
        yield queryInterface.addColumn('Users', 'password', {
            type: Sequelize.STRING,
            allowNull: true // Разрешаем значение NULL
        });
        // Обновляем существующие записи, устанавливая значение password
        yield queryInterface.sequelize.query('UPDATE "Users" SET "password" = "someDefaultValue" WHERE "password" IS NULL');
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        // Удаляем поле password
        yield queryInterface.removeColumn('Users', 'password');
    })
};
