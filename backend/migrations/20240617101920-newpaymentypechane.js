'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'type', {
      type: Sequelize.ENUM('donation', 'membership'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};