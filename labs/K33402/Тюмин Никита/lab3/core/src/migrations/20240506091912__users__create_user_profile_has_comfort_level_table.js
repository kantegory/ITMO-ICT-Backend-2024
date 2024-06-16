'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_profile_has_comfort_level', {
      userProfileId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comfortLevelId: {
        allowNull: false,
        primaryKey: true,
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
    });
    await queryInterface.addConstraint('user_profile_has_comfort_level', {
      fields: ['userProfileId'],
      type: 'foreign key',
      name: 'fk_user_profile_has_comfort_level_user_profile',
      references: {
        table: 'user_profiles',
        field: 'userId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('user_profile_has_comfort_level', {
      fields: ['comfortLevelId'],
      type: 'foreign key',
      name: 'fk_user_profile_has_comfort_level_comfort_level',
      references: {
        table: 'comfort_levels',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_profile_has_comfort_level', 'fk_user_profile_has_comfort_level_user_profile');
    await queryInterface.removeConstraint('user_profile_has_comfort_level', 'fk_user_profile_has_comfort_level_comfort_level');
    await queryInterface.dropTable('user_profile_has_comfort_level');
  }
};
