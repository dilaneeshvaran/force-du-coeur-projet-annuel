//rename choiceId of table options to id
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('options', 'choiceId', 'id');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('options', 'id', 'choiceId');
  }
};

