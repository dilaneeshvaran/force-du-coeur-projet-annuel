'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('messages', 'senderMail', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('messages', 'receiverMail', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('messages', 'senderMail', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('messages', 'receiverMail', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};