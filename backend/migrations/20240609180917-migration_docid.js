'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('documents', 'id');
    await queryInterface.addColumn('documents', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('documents', 'id');
    await queryInterface.addColumn('documents', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    });
  }
};