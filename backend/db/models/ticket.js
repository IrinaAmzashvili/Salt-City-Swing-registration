'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numOfTickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Number of tickets must be no less than 1.'}
      }
    },
  }, {});
  Ticket.associate = function(models) {
    Ticket.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Ticket.belongsTo(models.Class, { foreignKey: 'classId', onDelete: 'CASCADE' });
  };
  return Ticket;
};
