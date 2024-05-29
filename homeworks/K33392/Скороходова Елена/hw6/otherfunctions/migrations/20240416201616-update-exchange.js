'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('ExchangeRequests', 'exchangeWithUserId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('ExchangeRequests', 'bookTitle', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('ExchangeRequests', 'exchangeWithUserId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('ExchangeRequests', 'bookTitle', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
