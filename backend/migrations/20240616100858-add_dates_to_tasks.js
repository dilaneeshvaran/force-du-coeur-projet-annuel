'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tasks', 'completedDate', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('tasks', 'failedDate', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tasks', 'completedDate');
    await queryInterface.removeColumn('tasks', 'failedDate');
  }
};