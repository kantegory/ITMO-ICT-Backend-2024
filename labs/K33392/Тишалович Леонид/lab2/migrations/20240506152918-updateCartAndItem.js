"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Carts", "items", {
      type: Sequelize.INTEGER,
      references: { model: "Items", key: "id" },
      allowNull: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("Items", "cartId", {
      type: Sequelize.INTEGER,
      references: { model: "Carts", key: "id" },
      allowNull: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addConstraint("Items", {
      fields: ["cartId"],
      type: "foreign key",
      name: "FK_Item_Cart",
      references: {
        table: "Carts",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Carts", "items");

    await queryInterface.removeColumn("Items", "cartId");
  },
};
