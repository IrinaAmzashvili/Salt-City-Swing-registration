'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
      },
      vaxCardImg: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      userPhoto: {
        type: Sequelize.TEXT
      },
      mailingList: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userType: {
        allowNull: false,
        type: Sequelize.STRING(15),
        defaultValue: 'user',
        validate: {
          isIn: {
            args: [['user', 'admin', 'superUser']],
            msg: 'User type must be either user, admin, or superUser',
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
