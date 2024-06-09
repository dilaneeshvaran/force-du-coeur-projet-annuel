'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('documents', 'type');
    await queryInterface.removeColumn('documents', 'creationDate');
    await queryInterface.removeColumn('documents', 'authorId');
    await queryInterface.removeColumn('documents', 'newColumn');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('documents', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('documents', 'creationDate', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn('documents', 'authorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    });

    await queryInterface.addColumn('documents', 'newColumn', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};