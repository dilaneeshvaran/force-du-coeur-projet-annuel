'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_votes', 'id', {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_votes', 'id');
  }
};