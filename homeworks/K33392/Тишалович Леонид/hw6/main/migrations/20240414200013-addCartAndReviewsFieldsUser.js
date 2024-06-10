"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "reviews", {
      type: Sequelize.INTEGER,
      references: { model: "Reviews", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("Users", "cart", {
      type: Sequelize.INTEGER,
      references: { model: "Carts", key: "id" },
      unique: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "reviews");
    await queryInterface.removeColumn("Users", "cart");
  },
};
