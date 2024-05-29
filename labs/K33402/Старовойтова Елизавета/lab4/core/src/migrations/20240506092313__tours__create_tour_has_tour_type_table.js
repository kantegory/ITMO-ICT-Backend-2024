'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tour_has_tour_type', {
      tourId: {
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
    await queryInterface.addConstraint('tour_has_tour_type', {
      fields: ['tourId'],
      type: 'foreign key',
      name: 'fk_tour_has_tour_type_tour',
      references: {
        table: 'tours',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('tour_has_tour_type', {
      fields: ['tourTypeId'],
      type: 'foreign key',
      name: 'fk_tour_has_tour_type_tour_type',
      references: {
        table: 'tour_types',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tour_has_tour_type', 'fk_tour_has_tour_type_tour_type');
    await queryInterface.removeConstraint('tour_has_tour_type', 'fk_tour_has_tour_type_tour');
    await queryInterface.dropTable('tour_has_tour_type');
  }
};
