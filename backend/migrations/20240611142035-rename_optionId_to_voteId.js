'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('user_votes', 'optionId', 'voteId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('user_votes', 'voteId', 'optionId');
  }
};