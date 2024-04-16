module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ExchangeRequests', 'exchangeWithUserId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('ExchangeRequests', 'bookTitle', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ExchangeRequests', 'exchangeWithUserId');
    await queryInterface.removeColumn('ExchangeRequests', 'bookTitle');
  }
};