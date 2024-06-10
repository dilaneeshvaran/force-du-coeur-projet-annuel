'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('options', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      label: Sequelize.STRING,
      voteId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'votes',
          key: 'id',
        },
      },
      votes: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
    });

    await queryInterface.createTable('votes', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      startDate: Sequelize.DATE,
      endDate: Sequelize.DATE,
      votingType: Sequelize.ENUM('one-round', 'two-round'),
      ongoingRound: Sequelize.ENUM('first-round', 'second-round'),
      votingMethod: Sequelize.ENUM('majority rule', 'absolute majority'),
      status: Sequelize.ENUM('open', 'closed'),
      createdBy: Sequelize.INTEGER.UNSIGNED,
      voterId: Sequelize.INTEGER.UNSIGNED,
    });

    await queryInterface.createTable('user_votes', {
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      optionId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'options',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('options');
    await queryInterface.dropTable('votes');
    await queryInterface.dropTable('user_votes');
  }
};