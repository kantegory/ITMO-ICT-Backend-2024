'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'createdAt');
    await queryInterface.removeColumn('Users', 'updatedAt');
  }
};
