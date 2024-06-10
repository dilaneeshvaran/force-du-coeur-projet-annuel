module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // define other columns here
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('options');
  }
};