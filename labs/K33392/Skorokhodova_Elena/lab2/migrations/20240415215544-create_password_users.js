'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true 
    });

    
    await queryInterface.sequelize.query('UPDATE "Users" SET "password" = "someDefaultValue" WHERE "password" IS NULL');
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.removeColumn('Users', 'password');
  }
};
