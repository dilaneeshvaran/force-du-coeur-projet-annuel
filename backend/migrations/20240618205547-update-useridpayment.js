module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'user_id', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users', // name of your model
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payments', 'user_id', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false, // revert back to not allowing null
      references: {
        model: 'users', // name of your model
        key: 'id',
      },
    });
  },
};