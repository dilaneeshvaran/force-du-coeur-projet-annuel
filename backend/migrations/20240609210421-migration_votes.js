module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('votes', 'options', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('votes', 'options');
  }
};  