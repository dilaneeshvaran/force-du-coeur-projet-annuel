module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Participations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Participations');
  }
};