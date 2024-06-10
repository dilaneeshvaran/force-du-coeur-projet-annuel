module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Participations', 'createdAt');
    await queryInterface.removeColumn('Participations', 'updatedAt');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Participations', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Participations', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
  }
};