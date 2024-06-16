'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_profile_has_place', {
      userProfileId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      placeId: {
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
    await queryInterface.addConstraint('user_profile_has_place', {
      fields: ['userProfileId'],
      type: 'foreign key',
      name: 'fk_user_profile_has_place_user_profile',
      references: {
        table: 'user_profiles',
        field: 'userId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('user_profile_has_place', {
      fields: ['placeId'],
      type: 'foreign key',
      name: 'fk_user_profile_has_place_place',
      references: {
        table: 'places',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_profile_has_place', 'fk_user_profile_has_place_user_profile');
    await queryInterface.removeConstraint('user_profile_has_place', 'fk_user_profile_has_place_place');
    await queryInterface.dropTable('user_profile_has_place');
  }
};
