'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_profiles', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maxBudget: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      hasChildren: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      peopleCount: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    await queryInterface.addConstraint('user_profiles', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_user_profiles_user',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_profiles', 'fk_user_profiles_user');
    await queryInterface.dropTable('user_profiles');
  }
};