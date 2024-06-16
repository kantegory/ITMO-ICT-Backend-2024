'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('tours', {
         id: {
             allowNull: false,
             autoIncrement: true,
             primaryKey: true,
             type: Sequelize.INTEGER
         },
         name: {
             allowNull: false,
             type: Sequelize.STRING
         },
         price: {
             allowNull: false,
             type: Sequelize.INTEGER
         },
         canGoWithChildren: {
             allowNull: false,
             type: Sequelize.BOOLEAN
         },
         maxPeople: {
             allowNull: true,
             type: Sequelize.INTEGER
         },
         comfortLevelId: {
             allowNull: true,
             type: Sequelize.INTEGER
         },
         difficultyLevelId: {
             allowNull: true,
             type: Sequelize.INTEGER
         },
         placeId: {
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

        await queryInterface.addConstraint('tours', {
            fields: ['comfortLevelId'],
            type: 'foreign key',
            name: 'fk_tour_comfort_level',
            references: {
                table: 'comfort_levels',
                field: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        await queryInterface.addConstraint('tours', {
            fields: ['difficultyLevelId'],
            type: 'foreign key',
            name: 'fk_tour_difficulty_level',
            references: {
                table: 'difficulty_levels',
                field: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        await queryInterface.addConstraint('tours', {
            fields: ['placeId'],
            type: 'foreign key',
            name: 'fk_tour_place',
            references: {
                table: 'places',
                field: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.removeConstraint('tours', 'fk_tour_comfort_level');
        await queryInterface.removeConstraint('tours', 'fk_tour_difficulty_level');
        await queryInterface.removeConstraint('tours', 'fk_tour_place');
        await queryInterface.dropTable('tours');
    }
};
