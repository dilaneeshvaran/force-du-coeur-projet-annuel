'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      set(value) {
        this.setDataValue('username', value.toLowerCase());
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue('username', value.toLowerCase());
      }
    });
  }
};