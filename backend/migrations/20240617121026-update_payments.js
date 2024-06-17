'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('payments', 'typeId', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    });

    await queryInterface.changeColumn('payments', 'datePaiement', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'type', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('payments', 'typeId', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    });

    await queryInterface.changeColumn('payments', 'datePaiement', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  }
};