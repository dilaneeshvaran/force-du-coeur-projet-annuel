module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'user_id', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'user_id', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      }
    });
  }
};