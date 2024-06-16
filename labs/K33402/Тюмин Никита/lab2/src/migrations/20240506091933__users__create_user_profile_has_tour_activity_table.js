'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_profile_has_tour_activity', {
      userProfileId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tourActivityId: {
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
    await queryInterface.addConstraint('user_profile_has_tour_activity', {
      fields: ['userProfileId'],
      type: 'foreign key',
      name: 'fk_user_profile_has_tour_activity_user_profile',
      references: {
        table: 'user_profiles',
        field: 'userId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('user_profile_has_tour_activity', {
      fields: ['tourActivityId'],
      type: 'foreign key',
      name: 'fk_user_profile_has_tour_activity_tour_activity',
      references: {
        table: 'tour_activities',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_profile_has_tour_activity', 'fk_user_profile_has_tour_activity_user_profile');
    await queryInterface.removeConstraint('user_profile_has_tour_activity', 'fk_user_profile_has_tour_activity_tour_activity');
    await queryInterface.dropTable('user_profile_has_tour_activity');
  }
};
