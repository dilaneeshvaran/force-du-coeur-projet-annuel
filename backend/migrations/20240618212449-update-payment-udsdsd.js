module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('donations', 'donatorId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('donations', 'donatorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    });
  }
};