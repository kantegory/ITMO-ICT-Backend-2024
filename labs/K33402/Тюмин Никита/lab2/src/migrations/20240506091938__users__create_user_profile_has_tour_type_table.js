'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_profile_has_tour_type', {
      userProfileId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tourTypeId: {
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
    await queryInterface.addConstraint('user_profile_has_tour_type', {
      fields: ['userProfileId'],
      type: 'foreign key',
      name: 'fk_user_profile_has_tour_type_user_profile',
      references: {
        table: 'user_profiles',
        field: 'userId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('user_profile_has_tour_type', {
      fields: ['tourTypeId'],
      type: 'foreign key',
      name: 'fk_user_profile_has_tour_type_tour_type',
      references: {
        table: 'tour_types',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_profile_has_tour_type', 'fk_user_profile_has_tour_type_user_profile');
    await queryInterface.removeConstraint('user_profile_has_tour_type', 'fk_user_profile_has_tour_type_tour_type');
    await queryInterface.dropTable('user_profile_has_tour_type');
  }
};
