'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'typeId', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'typeId', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    });
  }
};