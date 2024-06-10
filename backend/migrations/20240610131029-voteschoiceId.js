module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
        id: { // changed from userId to id
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        firstname: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastname: {
          type: Sequelize.STRING,
          allowNull: false
        },
        verificationCode: {
          type: Sequelize.STRING,
          allowNull: false
        },
        passwordResetCode: {
          type: Sequelize.STRING,
          allowNull: true
        },
        verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      });
      await queryInterface.createTable('events', {
        id: { // changed from eventId to id
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false
        },
        location: {
          type: Sequelize.STRING,
          allowNull: false
        },
        availableSpots: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      });
      // Repeat for all other models
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('users');
      await queryInterface.dropTable('events');

      // Repeat for all other models
    }
  };