'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tour_has_tour_activity', {
      tourId: {
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
    await queryInterface.addConstraint('tour_has_tour_activity', {
      fields: ['tourId'],
      type: 'foreign key',
      name: 'fk_tour_has_tour_activity_tour',
      references: {
        table: 'tours',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('tour_has_tour_activity', {
      fields: ['tourActivityId'],
      type: 'foreign key',
      name: 'fk_tour_has_tour_activity_tour_activity',
      references: {
        table: 'tour_activities',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tour_has_tour_activity', 'fk_tour_has_tour_activity_tour_activity');
    await queryInterface.removeConstraint('tour_has_tour_activity', 'fk_tour_has_tour_activity_tour');
    await queryInterface.dropTable('tour_has_tour_activity');
  }
};
