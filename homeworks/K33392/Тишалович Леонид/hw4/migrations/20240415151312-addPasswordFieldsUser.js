"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "passwordHash", {
      type: Sequelize.STRING,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "passwordHash");
  },
};
