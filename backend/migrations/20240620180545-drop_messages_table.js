'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  },

  down: async (queryInterface, Sequelize) => {
    // Here you can define how to revert this migration.
    // This is just an example and probably needs adjustment.
    await queryInterface.createTable('messages', { id: Sequelize.INTEGER });
  }
};