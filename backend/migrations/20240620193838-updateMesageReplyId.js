'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('messages', 'replyAdminId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('messages', 'replied', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('messages', 'replyAdminId');
    await queryInterface.removeColumn('messages', 'replied');
  }
};