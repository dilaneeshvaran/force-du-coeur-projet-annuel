'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Allow NULL initially

    // Update NULL values to a valid userId or remove the row

    await queryInterface.addColumn('documents', 'senderId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    });

    await queryInterface.addColumn('documents', 'isArchieved', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });

    await queryInterface.addColumn('documents', 'file', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Add new column here
    await queryInterface.addColumn('documents', 'newColumn', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('documents', 'receiverId');
    await queryInterface.removeColumn('documents', 'senderId');
    await queryInterface.removeColumn('documents', 'isArchieved');
    await queryInterface.removeColumn('documents', 'file');
    // Remove new column here
    await queryInterface.removeColumn('documents', 'newColumn');
  }
};