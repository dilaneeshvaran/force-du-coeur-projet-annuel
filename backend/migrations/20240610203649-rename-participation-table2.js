module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('participation', 'participations');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('participations', 'participation');
  }
};