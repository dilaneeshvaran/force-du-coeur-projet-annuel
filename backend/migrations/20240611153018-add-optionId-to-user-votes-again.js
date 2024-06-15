module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_votes', 'optionId', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_votes', 'optionId');
  }
};