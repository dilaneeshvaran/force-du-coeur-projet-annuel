'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('choices', 'options');
    await queryInterface.renameColumn('options', 'choice', 'option');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('options', 'option', 'choice');
    await queryInterface.renameTable('options', 'choices');
  }
};