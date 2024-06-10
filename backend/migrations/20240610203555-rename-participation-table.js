module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Participations', 'participation');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('participation', 'Participations');
  }
};